import { NextResponse } from "next/server";
import { getBookings, bookSlot } from "@/lib/storage";
import { evaluateReschedulePolicy } from "@/lib/policies/evaluator";
import { SchedulingConstraintSolver } from "@/lib/scheduling/constraint-solver";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { newSlotDate, newSlotTime, newSlotId } = await request.json();
    const id = params.id;

    if (!newSlotDate || !newSlotTime) {
      return NextResponse.json(
        { error: "Please select a new date and time." },
        { status: 400 }
      );
    }

    const bookings = getBookings();
    const booking = bookings.find((b) => b.id === id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking reference not found." },
        { status: 404 }
      );
    }

    // 1. OPA Reschedule Policy Verification (24-hour advance notice requirement)
    const policyResult = evaluateReschedulePolicy(booking.slotDate);
    if (!policyResult.allow) {
      return NextResponse.json(
        {
          error: "Reschedule policy violation",
          policy: "booking-policy.rego",
          violations: [policyResult.reason || "Rescheduling requires at least 24 hours advance notice."],
        },
        { status: 422 }
      );
    }

    // 2. Z3 Scheduling SMT Solver
    const solver = new SchedulingConstraintSolver({
      bufferMinutes: 15,
      maxDailySessions: 3,
      businessStartMinutes: 540,
      businessEndMinutes: 1260,
    });

    const otherSessions = bookings
      .filter((b) => b.id !== id && (b.status === "confirmed" || b.status === "rescheduled"))
      .map((b) => {
        const timeParts = b.slotTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        let startMinutes = 600;
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const mins = parseInt(timeParts[2], 10);
          const ampm = timeParts[3].toUpperCase();
          if (ampm === "PM" && hours < 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;
          startMinutes = hours * 60 + mins;
        }
        return {
          id: b.id,
          date: b.slotDate,
          startMinutes,
          durationMinutes: b.slotDurationMinutes || 90,
        };
      });

    const newParts = newSlotTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let newStartMinutes = 600;
    if (newParts) {
      let hours = parseInt(newParts[1], 10);
      const mins = parseInt(newParts[2], 10);
      const ampm = newParts[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      newStartMinutes = hours * 60 + mins;
    }

    const candidateSession = {
      id: booking.id,
      date: newSlotDate,
      startMinutes: newStartMinutes,
      durationMinutes: booking.slotDurationMinutes || 90,
    };

    const smtResult = solver.checkSatisfiability(otherSessions, candidateSession);
    if (smtResult.status === "UNSAT") {
      return NextResponse.json(
        {
          error: "Reschedule slot constraint conflict (SMT Conflict)",
          status: "UNSAT",
          unsatCore: smtResult.unsatCore,
        },
        { status: 409 }
      );
    }

    if (newSlotId) {
      bookSlot(newSlotId);
    }

    booking.slotDate = newSlotDate;
    booking.slotTime = newSlotTime;
    booking.status = "rescheduled";

    const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");


    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reschedule appointment." },
      { status: 500 }
    );
  }
}

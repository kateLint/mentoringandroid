import { NextResponse } from "next/server";
import { getBookings, saveBooking, bookSlot, getOffer } from "@/lib/storage";
import { Booking } from "@/lib/types";
import { evaluateBookingPolicy } from "@/lib/policies/evaluator";
import { SchedulingConstraintSolver } from "@/lib/scheduling/constraint-solver";

export const dynamic = "force-dynamic";

export async function GET() {
  const bookings = getBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Field validation
    if (!data.fullName || !data.email || !data.primaryGoal || !data.slotDate || !data.slotTime) {
      return NextResponse.json(
        { error: "Please fill in all required intake and scheduling fields." },
        { status: 400 }
      );
    }

    if (!data.email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. OPA Policy-as-Code Evaluation
    const existingBookings = getBookings();
    const activeBookingsCount = existingBookings.filter(
      (b) => b.customerEmail.toLowerCase() === data.email.trim().toLowerCase() && b.status === "confirmed"
    ).length;

    const policyInput = {
      fullName: data.fullName?.trim() || "",
      email: data.email?.trim() || "",
      primaryGoal: data.primaryGoal?.trim() || "",
      acceptedTerms: data.acceptedTerms !== false,
      slotDate: data.slotDate,
      slotTime: data.slotTime,
      existingActiveBookings: activeBookingsCount,
    };

    const policyDecision = evaluateBookingPolicy(policyInput);
    if (!policyDecision.allow) {
      return NextResponse.json(
        {
          error: "Booking policy violation",
          policy: "booking-policy.rego",
          violations: policyDecision.violations,
        },
        { status: 422 }
      );
    }

    // 2. Z3-Inspired SMT Scheduling Constraint Solver
    const solver = new SchedulingConstraintSolver({
      bufferMinutes: 15,
      maxDailySessions: 3,
      businessStartMinutes: 540, // 09:00 AM
      businessEndMinutes: 1260, // 09:00 PM
    });

    const activeSessions = existingBookings
      .filter((b) => b.status === "confirmed" || b.status === "rescheduled")
      .map((b) => {
        const timeParts = b.slotTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        let startMinutes = 600; // default 10:00 AM
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

    // Parse candidate slot time
    const candParts = data.slotTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let candStartMinutes = 600;
    if (candParts) {
      let hours = parseInt(candParts[1], 10);
      const mins = parseInt(candParts[2], 10);
      const ampm = candParts[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      candStartMinutes = hours * 60 + mins;
    }

    const candidateSession = {
      id: "CANDIDATE_BOOKING",
      date: data.slotDate,
      startMinutes: candStartMinutes,
      durationMinutes: 90,
    };

    const smtResult = solver.checkSatisfiability(activeSessions, candidateSession);
    if (smtResult.status === "UNSAT") {
      return NextResponse.json(
        {
          error: "Scheduling constraint unsatisfiable (SMT Conflict)",
          status: "UNSAT",
          unsatCore: smtResult.unsatCore,
        },
        { status: 409 }
      );
    }

    // Server-side price verification
    const activeOffer = getOffer();

    // Mark slot if slotId provided
    if (data.slotId) {
      bookSlot(data.slotId);
    }

    // Generate reference code
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookingId = `MNT-${randomHex}`;

    // Create booking record
    const newBooking: Booking = {
      id: bookingId,
      offerId: activeOffer.id,
      customerName: data.fullName.trim(),
      customerEmail: data.email.trim(),
      timeZone: data.timeZone || "UTC",
      primaryGoal: data.primaryGoal.trim(),
      focusArea: data.focusArea || "general",
      portfolioOrResumeUrl: data.portfolioOrResumeUrl?.trim() || "",
      currentRoleOrBackground: data.currentRoleOrBackground?.trim() || "",
      notesOrAccessibility: data.notesOrAccessibility?.trim() || "",
      slotDate: data.slotDate,
      slotTime: data.slotTime,
      slotDurationMinutes: activeOffer.durationMinutes,
      currency: activeOffer.currency,
      amountPaid: activeOffer.currentPrice,
      status: "confirmed",
      paymentReference: `PAY-SIM-${Date.now()}-${randomHex}`,
      meetingLink: `https://meet.google.com/mnt-${randomHex.toLowerCase().slice(0, 3)}-${randomHex.toLowerCase().slice(3, 6)}`,
      createdAt: new Date().toISOString(),
    };

    saveBooking(newBooking);

    return NextResponse.json({
      success: true,
      booking: newBooking,
      verification: {
        opa: "PASSED",
        smt: "SAT",
        bufferMarginMinutes: 15,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating your booking." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getBookings, bookSlot } from "@/lib/storage";
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

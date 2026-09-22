import { NextResponse } from "next/server";
import { getBookings, saveBooking, bookSlot, getOffer } from "@/lib/storage";
import { Booking } from "@/lib/types";

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
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating your booking." },
      { status: 500 }
    );
  }
}

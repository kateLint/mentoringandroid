import { NextResponse } from "next/server";
import { updateBookingStatus, getBookings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const id = params.id;

    if (!["confirmed", "rescheduled", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const updated = updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking status." }, { status: 500 });
  }
}

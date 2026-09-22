import { NextResponse } from "next/server";
import { getBookings } from "@/lib/storage";
import { verifyRazorpayPaymentSignature } from "@/lib/payment/providers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rawPayload = await request.text();
    const razorpaySignature = request.headers.get("x-razorpay-signature") || "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_test_secret_for_simulation";

    const event = JSON.parse(rawPayload);

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (process.env.RAZORPAY_WEBHOOK_SECRET) {
        const verification = verifyRazorpayPaymentSignature(
          orderId,
          paymentId,
          razorpaySignature,
          webhookSecret
        );
        if (!verification.valid) {
          return NextResponse.json(
            { error: "Invalid Razorpay webhook signature", reason: verification.reason },
            { status: 400 }
          );
        }
      }

      const bookingRef = paymentEntity?.notes?.bookingId;
      if (bookingRef) {
        const bookings = getBookings();
        const booking = bookings.find((b) => b.id === bookingRef);
        if (booking) {
          booking.status = "confirmed";
          booking.paymentReference = paymentId;

          const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");
          fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");

          return NextResponse.json({
            received: true,
            status: "razorpay_confirmed",
            bookingId: bookingRef,
          });
        }
      }
    }

    return NextResponse.json({ received: true, event: event.event });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Razorpay webhook handler failed" },
      { status: 500 }
    );
  }
}

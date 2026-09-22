import { NextResponse } from "next/server";
import { getBookings, saveBooking } from "@/lib/storage";
import { verifyStripeWebhookSignature } from "@/lib/payment/providers";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rawPayload = await request.text();
    const signatureHeader = request.headers.get("stripe-signature") || "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_test_secret_for_simulation";

    // If live key is provided, strictly enforce HMAC-SHA256 signature
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      const verification = verifyStripeWebhookSignature(
        rawPayload,
        signatureHeader,
        webhookSecret
      );
      if (!verification.valid) {
        return NextResponse.json(
          { error: "Invalid Stripe signature", reason: verification.reason },
          { status: 400 }
        );
      }
    }

    const event = JSON.parse(rawPayload);

    if (event.type === "checkout.session.completed") {
      const session = event.data?.object;
      const bookingId = session?.metadata?.bookingId || session?.client_reference_id;

      if (bookingId) {
        const bookings = getBookings();
        const booking = bookings.find((b) => b.id === bookingId);
        if (booking) {
          booking.status = "confirmed";
          booking.paymentReference = session.payment_intent || session.id;

          const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");
          fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");

          return NextResponse.json({
            received: true,
            status: "booking_confirmed",
            bookingId,
          });
        }
      }
    }

    return NextResponse.json({ received: true, event: event.type });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

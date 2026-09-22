import crypto from "crypto";
import { Booking } from "../types";

export interface StripeCheckoutOptions {
  booking: Booking;
  successUrl: string;
  cancelUrl: string;
}

export interface RazorpayOrderOptions {
  booking: Booking;
  currency: string;
  amountInPaise: number;
}

/**
 * Validates Stripe webhook HMAC signature header (`stripe-signature`).
 * Format of header: `t=timestamp,v1=signature_hash`
 */
export function verifyStripeWebhookSignature(
  rawPayload: string,
  signatureHeader: string,
  secret: string
): { valid: boolean; reason?: string } {
  if (!signatureHeader) {
    return { valid: false, reason: "Missing stripe-signature header" };
  }

  const parts = signatureHeader.split(",").reduce((acc, item) => {
    const [key, val] = item.split("=");
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts["t"];
  const signature = parts["v1"];

  if (!timestamp || !signature) {
    return { valid: false, reason: "Malformed stripe-signature header components" };
  }

  // Prevent replay attacks (5 minute threshold)
  const currentTime = Math.floor(Date.now() / 1000);
  const signatureTime = parseInt(timestamp, 10);
  if (Math.abs(currentTime - signatureTime) > 300) {
    return { valid: false, reason: "Webhook timestamp outside 5-minute tolerance window" };
  }

  const signedPayload = `${timestamp}.${rawPayload}`;
  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  try {
    const valid = crypto.timingSafeEqual(
      Buffer.from(computedHash, "hex"),
      Buffer.from(signature, "hex")
    );
    return { valid };
  } catch {
    return { valid: false, reason: "Signature mismatch" };
  }
}

/**
 * Validates Razorpay payment HMAC signature (`x-razorpay-signature`).
 * Sign data = `order_id + "|" + payment_id`
 */
export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): { valid: boolean; reason?: string } {
  if (!orderId || !paymentId || !signature || !secret) {
    return { valid: false, reason: "Missing required Razorpay signature parameters" };
  }

  const payload = `${orderId}|${paymentId}`;
  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  try {
    const valid = crypto.timingSafeEqual(
      Buffer.from(computedHash, "hex"),
      Buffer.from(signature, "hex")
    );
    return { valid };
  } catch {
    return { valid: false, reason: "Razorpay signature mismatch" };
  }
}

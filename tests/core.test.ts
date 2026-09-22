import test from "node:test";
import assert from "node:assert";
import { generateDefaultSlots, defaultOffer, defaultMentor } from "../lib/data/default-content";
import { generateStructuredData } from "../lib/schema";
import { getPriceForCurrency } from "../lib/currency";
import { evaluateBookingPolicy, evaluateReschedulePolicy } from "../lib/policies/evaluator";
import { SchedulingConstraintSolver } from "../lib/scheduling/constraint-solver";
import { generateIcsCalendar } from "../lib/email/templates";
import { evaluateArchitecture } from "../lib/simulator/engine";
import { verifyStripeWebhookSignature, verifyRazorpayPaymentSignature } from "../lib/payment/providers";
import crypto from "node:crypto";

test("generateDefaultSlots produces valid upcoming dates without Sundays", () => {
  const slots = generateDefaultSlots();
  assert.ok(slots.length > 0, "Slots should not be empty");

  for (const slot of slots) {
    assert.ok(slot.id, "Slot must have an ID");
    assert.match(slot.date, /^\d{4}-\d{2}-\d{2}$/, "Slot date must be in YYYY-MM-DD format");
    assert.ok(slot.time, "Slot must have a time string");

    const day = new Date(slot.date + "T00:00:00").getDay();
    assert.notStrictEqual(day, 0, "Sundays should be excluded from default slots");
  }
});

test("generateStructuredData returns valid Schema.org graph", () => {
  const schema = generateStructuredData(defaultOffer, defaultMentor);
  assert.strictEqual(schema["@context"], "https://schema.org");
  assert.ok(Array.isArray(schema["@graph"]), "@graph should be an array");

  const person = schema["@graph"].find((item: any) => item["@type"] === "Person");
  assert.ok(person, "Must include Person entry");
  assert.strictEqual(person.name, defaultMentor.name);

  const service = schema["@graph"].find((item: any) => item["@type"] === "Service");
  assert.ok(service, "Must include Service entry");
  assert.strictEqual(service?.offers?.price, defaultOffer.currentPrice);
});

test("defaultOffer has positive prices and valid 90-min duration per spec", () => {
  assert.ok(defaultOffer.currentPrice > 0, "Current price must be positive");
  assert.ok(defaultOffer.originalPrice > defaultOffer.currentPrice, "Original price must exceed current price");
  assert.strictEqual(defaultOffer.durationMinutes, 90, "Duration must be 90 minutes per spec");
  assert.ok(defaultOffer.inclusions.length >= 4, "Must have at least 4 deliverables");
});

test("multi-currency configurations return valid localized rates", () => {
  const inr = getPriceForCurrency("INR");
  const usd = getPriceForCurrency("USD");
  const eur = getPriceForCurrency("EUR");

  assert.strictEqual(inr.symbol, "₹");
  assert.strictEqual(usd.symbol, "$");
  assert.strictEqual(eur.symbol, "€");

  assert.ok(usd.basePrice > 0);
  assert.ok(usd.originalPrice > usd.basePrice);
});

test("OPA policy evaluation enforces email, goal quality, and notice invariants", () => {
  // Invalid input: goal too short, invalid email
  const invalidResult = evaluateBookingPolicy({
    fullName: "Alex",
    email: "not-an-email",
    primaryGoal: "short",
    slotDate: "2026-09-24",
    slotTime: "10:00 AM",
  });
  assert.strictEqual(invalidResult.allow, false);
  assert.ok(invalidResult.violations.length >= 2);

  // Valid input
  const validResult = evaluateBookingPolicy({
    fullName: "Alex Johnson",
    email: "alex@company.com",
    primaryGoal: "Prepare for upcoming Staff Android Architect system design round focusing on Compose state",
    acceptedTerms: true,
    slotDate: "2026-09-24",
    slotTime: "10:00 AM",
    existingActiveBookings: 0,
  });
  assert.strictEqual(validResult.allow, true);
  assert.strictEqual(validResult.violations.length, 0);
});

test("Z3-inspired SMT solver detects overlap, buffer, and capacity conflicts", () => {
  const solver = new SchedulingConstraintSolver({
    bufferMinutes: 15,
    maxDailySessions: 2,
    businessStartMinutes: 480, // 08:00 AM
    businessEndMinutes: 1200, // 08:00 PM
  });

  const existingSession = {
    id: "MNT-SESSION-1",
    date: "2026-09-25",
    startMinutes: 600, // 10:00 AM
    durationMinutes: 90, // Ends at 11:30 AM (690)
  };

  // 1. Overlapping candidate (10:30 AM = 630): should be UNSAT
  const overlappingCandidate = {
    id: "MNT-CANDIDATE-1",
    date: "2026-09-25",
    startMinutes: 630,
    durationMinutes: 90,
  };
  const overlapRes = solver.checkSatisfiability([existingSession], overlappingCandidate);
  assert.strictEqual(overlapRes.status, "UNSAT");
  assert.ok(overlapRes.unsatCore?.includes("Overlap violation"));

  // 2. Violated buffer candidate (Starts at 11:35 AM = 695, only 5 min buffer): should be UNSAT
  const bufferCandidate = {
    id: "MNT-CANDIDATE-2",
    date: "2026-09-25",
    startMinutes: 695,
    durationMinutes: 90,
  };
  const bufferRes = solver.checkSatisfiability([existingSession], bufferCandidate);
  assert.strictEqual(bufferRes.status, "UNSAT");
  assert.ok(bufferRes.unsatCore?.includes("Buffer violation"));

  // 3. Valid non-conflicting candidate (Starts at 02:00 PM = 840): should be SAT
  const validCandidate = {
    id: "MNT-CANDIDATE-3",
    date: "2026-09-25",
    startMinutes: 840,
    durationMinutes: 90,
  };
  const validRes = solver.checkSatisfiability([existingSession], validCandidate);
  assert.strictEqual(validRes.status, "SAT");

  // 4. Capacity limit test: Max 2 daily sessions. If 2 exist, a 3rd should be UNSAT
  const secondSession = {
    id: "MNT-SESSION-2",
    date: "2026-09-25",
    startMinutes: 840,
    durationMinutes: 90,
  };
  const thirdCandidate = {
    id: "MNT-CANDIDATE-4",
    date: "2026-09-25",
    startMinutes: 1000,
    durationMinutes: 90,
  };
  const capRes = solver.checkSatisfiability([existingSession, secondSession], thirdCandidate);
  assert.strictEqual(capRes.status, "UNSAT");
  assert.ok(capRes.unsatCore?.includes("Daily capacity"));
});

test("evaluateReschedulePolicy enforces 24-hour advance notice window", () => {
  // Slot in 3 days -> allowed
  const futureDate = new Date(Date.now() + 72 * 3600 * 1000).toISOString().split("T")[0];
  const allowRes = evaluateReschedulePolicy(futureDate);
  assert.strictEqual(allowRes.allow, true);

  // Slot in 2 hours -> blocked
  const imminentDate = new Date(Date.now() + 2 * 3600 * 1000).toISOString().split("T")[0];
  const blockRes = evaluateReschedulePolicy(imminentDate, new Date(Date.now() + 1 * 3600 * 1000));
  assert.strictEqual(blockRes.allow, false);
  assert.ok(blockRes.reason?.includes("24 hours notice"));
});

test("generateIcsCalendar generates compliant RFC 5545 VEVENT", () => {
  const mockBooking = {
    id: "MNT-TESTREF",
    offerId: "android-1on1-mentoring",
    customerName: "Alex Johnson",
    customerEmail: "alex@example.com",
    timeZone: "America/New_York",
    primaryGoal: "Compose Recomposition optimization",
    focusArea: "interview",
    slotDate: "2026-09-25",
    slotTime: "10:00 AM",
    slotDurationMinutes: 90,
    currency: "INR",
    amountPaid: 4999,
    status: "confirmed" as const,
    paymentReference: "PAY-123",
    meetingLink: "https://meet.google.com/mnt-test-ref",
    createdAt: new Date().toISOString(),
  };

  const ics = generateIcsCalendar(mockBooking, defaultMentor);
  assert.ok(ics.includes("BEGIN:VCALENDAR"));
  assert.ok(ics.includes("BEGIN:VEVENT"));
  assert.ok(ics.includes("SUMMARY:1:1 Android Mentorship with Kate Lint"));
  assert.ok(ics.includes("LOCATION:https://meet.google.com/mnt-test-ref"));
  assert.ok(ics.includes("END:VCALENDAR"));
});

test("evaluateArchitecture correctly detects Compose and Coroutine anti-patterns", () => {
  // Test 1: Un-remembered mutableStateOf
  const composeAntiPattern = `
    @Composable
    fun BrokenCounter() {
      var count = mutableStateOf(0)
    }
  `;
  const report1 = evaluateArchitecture({ track: "compose", codeOrDescription: composeAntiPattern });
  assert.ok(report1.score < 80, "Score should be penalized for unremembered state");
  assert.ok(report1.findings.some((f) => f.id === "CMP-001"));

  // Test 2: GlobalScope & Blocking I/O
  const coroutineLeak = `
    class Repo {
      fun download() {
        GlobalScope.launch {
          val stream = FileInputStream("file.txt")
        }
      }
    }
  `;
  const report2 = evaluateArchitecture({ track: "coroutines", codeOrDescription: coroutineLeak });
  assert.ok(report2.findings.some((f) => f.id === "COR-001"));
  assert.ok(report2.findings.some((f) => f.id === "COR-002"));
});

test("verifyStripeWebhookSignature validates authentic HMAC-SHA256 signatures", () => {
  const secret = "whsec_test_secret_12345";
  const payload = JSON.stringify({ id: "evt_123", type: "checkout.session.completed" });
  const timestamp = Math.floor(Date.now() / 1000);

  const signedPayload = `${timestamp}.${payload}`;
  const validHash = crypto.createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");
  const signatureHeader = `t=${timestamp},v1=${validHash}`;

  // Valid signature
  const validResult = verifyStripeWebhookSignature(payload, signatureHeader, secret);
  assert.strictEqual(validResult.valid, true);

  // Invalid signature
  const invalidResult = verifyStripeWebhookSignature(payload, `t=${timestamp},v1=wrong_hash`, secret);
  assert.strictEqual(invalidResult.valid, false);
});

test("verifyRazorpayPaymentSignature validates authentic order|payment signatures", () => {
  const secret = "rzp_secret_998877";
  const orderId = "order_N123456";
  const paymentId = "pay_P987654";

  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`, "utf8")
    .digest("hex");

  // Valid
  const validResult = verifyRazorpayPaymentSignature(orderId, paymentId, expectedHash, secret);
  assert.strictEqual(validResult.valid, true);

  // Invalid
  const invalidResult = verifyRazorpayPaymentSignature(orderId, paymentId, "forged_signature", secret);
  assert.strictEqual(invalidResult.valid, false);
});


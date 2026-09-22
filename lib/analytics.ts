export type AnalyticsEvent =
  | { name: "cta_click"; location: string; target: string }
  | { name: "intake_start" }
  | { name: "intake_submit"; focusArea: string }
  | { name: "slot_selected"; date: string }
  | { name: "checkout_start"; amount: number; currency: string }
  | { name: "payment_success"; bookingId: string }
  | { name: "booking_cancelled"; step: number };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  try {
    // 1. Console log in development
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics Event] ${event.name}:`, event);
    }

    // 2. Dispatch custom DOM event for third-party tag managers or integrations
    const customEvent = new CustomEvent("mentoring_analytics", { detail: event });
    window.dispatchEvent(customEvent);

    // 3. Store anonymous event counter in sessionStorage
    const current = JSON.parse(sessionStorage.getItem("mentoring_events") || "[]");
    current.push({ ...event, timestamp: new Date().toISOString() });
    sessionStorage.setItem("mentoring_events", JSON.stringify(current.slice(-50)));
  } catch (err) {
    // Fail silently without disrupting user flow
  }
}

export interface PolicyInput {
  fullName?: string;
  email: string;
  primaryGoal: string;
  acceptedTerms?: boolean;
  slotDate: string;
  slotTime: string;
  existingActiveBookings?: number;
  currentTimestamp?: number;
  slotTimestamp?: number;
}

export interface PolicyResult {
  allow: boolean;
  violations: string[];
}

export function evaluateBookingPolicy(input: PolicyInput): PolicyResult {
  const violations: string[] = [];

  // Rule 1: Full name
  if (!input.fullName || input.fullName.trim().length === 0) {
    violations.push("Full name is required.");
  }

  // Rule 2: Email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    violations.push("A valid email address is required.");
  }

  // Rule 3: Goal quality (>= 15 chars)
  if (!input.primaryGoal || input.primaryGoal.trim().length < 15) {
    violations.push(
      "Primary goal description must be at least 15 characters to ensure a productive 90-minute session."
    );
  }

  // Rule 4: Terms
  if (input.acceptedTerms !== undefined && input.acceptedTerms !== true) {
    violations.push("You must accept the terms of service and privacy policy.");
  }

  // Rule 5: Active bookings limit
  if (input.existingActiveBookings !== undefined && input.existingActiveBookings >= 2) {
    violations.push("A mentee may have a maximum of 2 active upcoming sessions at a time.");
  }

  return {
    allow: violations.length === 0,
    violations,
  };
}

export function evaluateReschedulePolicy(
  currentSlotDate: string,
  requestDate: Date = new Date()
): { allow: boolean; hoursRemaining: number; reason?: string } {
  const slotDateObj = new Date(currentSlotDate + "T10:00:00Z");
  const diffMs = slotDateObj.getTime() - requestDate.getTime();
  const hoursRemaining = Math.round(diffMs / (1000 * 60 * 60));

  if (hoursRemaining < 24) {
    return {
      allow: false,
      hoursRemaining,
      reason: `Rescheduling requires at least 24 hours notice. Current notice is ${Math.max(
        0,
        hoursRemaining
      )} hours.`,
    };
  }

  return {
    allow: true,
    hoursRemaining,
  };
}

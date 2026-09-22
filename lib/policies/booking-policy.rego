package mentoring.booking

# Default deny
default allow = false

# Allow booking if no deny rules are triggered
allow {
    count(deny) == 0
}

# Rule 1: Intake completeness - Full Name must be provided
deny[msg] {
    not input.fullName
    msg := "Full name is required."
}

# Rule 2: Valid email structure
deny[msg] {
    not regex.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", input.email)
    msg := "A valid email address is required."
}

# Rule 3: Meaningful goal description (prevent spam / low quality inputs)
deny[msg] {
    count(input.primaryGoal) < 15
    msg := "Primary goal description must be at least 15 characters to ensure a productive 90-minute session."
}

# Rule 4: Terms and privacy agreement
deny[msg] {
    input.acceptedTerms != true
    msg := "You must accept the terms of service and privacy policy."
}

# Rule 5: Slot lead time - Must book at least 12 hours in advance
deny[msg] {
    hours_until_slot := (input.slotTimestamp - input.currentTimestamp) / 3600
    hours_until_slot < 12
    msg := "Bookings must be scheduled at least 12 hours in advance to give the mentor time to review your background."
}

# Rule 6: Maximum active bookings per mentee
deny[msg] {
    input.existingActiveBookings >= 2
    msg := "A mentee may have a maximum of 2 active upcoming sessions at a time."
}

# Rescheduling Policy: Free rescheduling if >= 24 hours in advance
default allow_reschedule = false

allow_reschedule {
    hours_until_current := (input.currentSlotTimestamp - input.requestTimestamp) / 3600
    hours_until_current >= 24
}

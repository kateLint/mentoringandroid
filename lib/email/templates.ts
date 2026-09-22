import { Booking, Offer, MentorProfile } from "../types";

export function generateIcsCalendar(booking: Booking, mentor: MentorProfile): string {
  const dateFormatted = booking.slotDate.replace(/-/g, "");
  // Start at 10:00:00Z as default representation
  const dtStart = `${dateFormatted}T100000Z`;
  const dtEnd = `${dateFormatted}T113000Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AndroidEngineers Mentorship//1:1 Mentoring//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${booking.id}@mentoringandroid.dev`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:1:1 Android Mentorship with ${mentor.name}`,
    `DESCRIPTION:Your 90-minute Android engineering & architecture strategy call.\\nMeeting Link: ${booking.meetingLink}\\nGoal: ${booking.primaryGoal}`,
    `LOCATION:${booking.meetingLink}`,
    `ORGANIZER;CN=${mentor.name}:mailto:support@mentoringandroid.dev`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${booking.customerName}:mailto:${booking.customerEmail}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: 1:1 Mentoring Call in 15 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function renderConfirmationEmailHtml(
  booking: Booking,
  offer: Offer,
  mentor: MentorProfile
): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your 1:1 Android Mentorship is Confirmed</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; padding: 32px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 12px; text-transform: uppercase;">Confirmed Booking</span>
      <h1 style="font-size: 24px; font-weight: 900; margin-top: 12px; color: #0f172a;">You're booked with ${mentor.name}!</h1>
      <p style="color: #64748b; font-size: 14px;">Booking Reference: <strong>${booking.id}</strong></p>
    </div>

    <div style="background: #f1f5f9; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-size: 16px; margin: 0 0 12px 0;">Appointment Details</h3>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Date & Time:</strong> ${booking.slotDate} at ${booking.slotTime} (${booking.timeZone})</p>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Duration:</strong> ${booking.slotDurationMinutes} Minutes Live 1:1 Call</p>
      <p style="margin: 4px 0; font-size: 14px;"><strong>Video Meeting:</strong> <a href="${booking.meetingLink}" style="color: #16a34a; font-weight: bold;">${booking.meetingLink}</a></p>
    </div>

    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 15px; margin-bottom: 8px;">Your Stated Primary Goal</h3>
      <p style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 10px; font-size: 13px; color: #334155;">
        ${booking.primaryGoal}
      </p>
    </div>

    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 15px; margin-bottom: 8px;">How to Prepare:</h3>
      <ul style="font-size: 13px; color: #475569; padding-left: 20px; line-height: 1.6;">
        <li>Have your code repo, architecture diagram, or resume open.</li>
        <li>Join the Google Meet link 2 minutes early to test mic and video.</li>
        <li>Feel free to reply to this email with any extra documents you'd like reviewed.</li>
      </ul>
    </div>

    <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
      <a href="https://mentoringandroid.dev/booking/reschedule?ref=${booking.id}" style="color: #475569; font-size: 12px; text-decoration: underline; margin-right: 16px;">
        Need to reschedule?
      </a>
      <a href="mailto:support@mentoringandroid.dev" style="color: #475569; font-size: 12px; text-decoration: underline;">
        Contact Support
      </a>
    </div>
  </div>
</body>
</html>`;
}

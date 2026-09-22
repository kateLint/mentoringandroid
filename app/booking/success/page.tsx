"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  FileText,
  Mail,
  ArrowRight,
  Download,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { Booking } from "@/lib/types";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => {
        if (ref) {
          const match = data.find((b) => b.id === ref);
          if (match) setBooking(match);
        } else if (data.length > 0) {
          setBooking(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load booking:", err);
        setLoading(false);
      });
  }, [ref]);

  const copyMeetLink = () => {
    if (booking?.meetingLink) {
      navigator.clipboard.writeText(booking.meetingLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Generate Google Calendar Link
  const generateGoogleCalendarUrl = () => {
    if (!booking) return "#";
    const title = encodeURIComponent("1:1 Android Mentorship Session with Kate Lint");
    const details = encodeURIComponent(
      `1:1 Android Architecture & Career Mentorship\nMeeting Link: ${booking.meetingLink}\nBooking Ref: ${booking.id}\nGoal: ${booking.primaryGoal}`
    );
    const location = encodeURIComponent(booking.meetingLink);
    // Format approximate start time
    const startIso = `${booking.slotDate.replace(/-/g, "")}T100000Z`;
    const endIso = `${booking.slotDate.replace(/-/g, "")}T113000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Verifying booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Booking Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            You&apos;re booked for 1:1 Mentoring!
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            A confirmation receipt and calendar invitation have been sent to{" "}
            <span className="font-semibold text-slate-900">{booking?.customerEmail || "your email"}</span>.
          </p>

          {/* Reference Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono font-bold">
            <span>Booking Ref:</span>
            <span className="text-emerald-700">{booking?.id || ref || "MNT-ACTIVE"}</span>
          </div>
        </div>

        {/* Appointment Details Box */}
        {booking && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Session Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Date & Time</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {booking.slotDate} at {booking.slotTime}
                  </p>
                  <span className="text-[11px] text-slate-400">({booking.timeZone})</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Duration & Format</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {booking.slotDurationMinutes} Minutes Live 1:1 Call
                  </p>
                  <span className="text-[11px] text-slate-400">Includes written roadmap</span>
                </div>
              </div>
            </div>

            {/* Video Meeting Callout */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Google Meet Video Call
                  </span>
                  <p className="text-xs font-mono text-slate-700 mt-0.5">
                    {booking.meetingLink}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={copyMeetLink}
                  className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                </button>
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <span>Join</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Calendar Integration */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Add to your calendar:
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Google Calendar</span>
                </a>
                <a
                  href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:1:1 Android Mentoring with Kate Lint%0ADESCRIPTION:Mentoring Call%0ALOCATION:${booking.meetingLink}%0AEND:VEVENT%0AEND:VCALENDAR`}
                  download="android-mentoring.ics"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Download .ICS file (Apple / Outlook)</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Preparation Steps Box */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            How to prepare for our session:
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong>Have your target priorities ready:</strong> We will review your answers submitted in the intake, but feel free to have any questions or scenarios handy.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong>Test your audio/mic and video:</strong> We will use Google Meet. Make sure your browser has permissions allowed.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong>Rescheduling note:</strong> If you need to move your session, simply reply to your confirmation email at least 24 hours in advance.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Loading booking confirmation...</p>
          </div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}

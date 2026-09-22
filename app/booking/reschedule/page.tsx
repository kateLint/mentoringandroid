"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Booking, TimeSlot } from "@/lib/types";

function RescheduleContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";
  const router = useRouter();

  const [bookingId, setBookingId] = useState(initialRef);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rescheduledSuccess, setRescheduledSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data: TimeSlot[]) => {
        setSlots(data);
        const open = data.find((s) => s.isAvailable);
        if (open) setSelectedDate(open.date);
      });

    if (initialRef) {
      lookupBooking(initialRef);
    }
  }, [initialRef]);

  const lookupBooking = async (idToLook: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings");
      const list: Booking[] = await res.json();
      const found = list.find((b) => b.id.toUpperCase() === idToLook.trim().toUpperCase());
      if (found) {
        setBooking(found);
      } else {
        setError(`No booking found matching reference "${idToLook}".`);
      }
    } catch (e) {
      setError("Failed to fetch booking details.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;
    lookupBooking(bookingId);
  };

  const handleReschedule = async () => {
    if (!booking || !selectedSlot) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings/${booking.id}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newSlotDate: selectedSlot.date,
          newSlotTime: selectedSlot.time,
          newSlotId: selectedSlot.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reschedule.");
      }

      setBooking(data.booking);
      setRescheduledSuccess(true);
    } catch (err: any) {
      setError(err.message || "Rescheduling failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableDates = Array.from(new Set(slots.map((s) => s.date))).sort();
  const currentDaySlots = slots.filter((s) => s.date === selectedDate);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Self-Service Rescheduling
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Reschedule Your Mentorship Session
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Free rescheduling is available up to 24 hours before your session.
          </p>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* If no booking loaded yet, show lookup input */}
          {!booking && (
            <form onSubmit={handleLookupSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enter Booking Reference ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MNT-XXXXXX"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm focus:border-emerald-600 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-emerald-600 transition-colors"
              >
                {loading ? "Searching..." : "Find My Booking"}
              </button>
            </form>
          )}

          {/* Booking Found: Show Current Details and Slot Picker */}
          {booking && !rescheduledSuccess && (
            <div className="mt-6 space-y-6 border-t border-slate-100 pt-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 uppercase font-semibold">
                  Currently Scheduled Slot
                </div>
                <div className="font-extrabold text-slate-900 text-base mt-0.5">
                  {booking.slotDate} at {booking.slotTime} ({booking.timeZone})
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Attendee: {booking.customerName} ({booking.customerEmail})
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select a New Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableDates.map((dStr) => {
                    const d = new Date(dStr + "T00:00:00");
                    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
                    const dayNum = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
                    const isSelected = selectedDate === dStr;

                    return (
                      <button
                        key={dStr}
                        type="button"
                        onClick={() => {
                          setSelectedDate(dStr);
                          setSelectedSlot(null);
                        }}
                        className={`min-w-[80px] p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 text-slate-900 font-bold ring-1 ring-emerald-500"
                            : "border-slate-200 text-slate-700 bg-white"
                        }`}
                      >
                        <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                          {dayName}
                        </span>
                        <span className="text-xs font-extrabold mt-0.5">{dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slot grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose New Time on {selectedDate}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentDaySlots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          !slot.isAvailable
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-slate-900 text-white border-slate-900 ring-2 ring-emerald-500"
                            : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500"
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirmation Button */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setBooking(null)}
                  className="py-3 px-5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Different Booking
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot || submitting}
                  onClick={handleReschedule}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 text-white font-extrabold text-sm transition-all"
                >
                  {submitting ? "Updating..." : "Confirm Reschedule"}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {rescheduledSuccess && booking && (
            <div className="mt-6 text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Session Successfully Rescheduled!
              </h3>
              <p className="text-sm text-slate-600">
                Your new appointment is confirmed for{" "}
                <span className="font-bold text-slate-900">
                  {booking.slotDate} at {booking.slotTime} ({booking.timeZone})
                </span>
                . An updated calendar invitation has been sent to your email.
              </p>
              <div className="pt-4">
                <Link
                  href={`/booking/success?ref=${booking.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  <span>View Updated Confirmation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReschedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-sm font-semibold text-slate-600">Loading rescheduling portal...</div>
        </div>
      }
    >
      <RescheduleContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Info,
  CreditCard,
  User,
  Mail,
  Globe,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Offer, TimeSlot } from "@/lib/types";

export default function BookPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");
  const [focusArea, setFocusArea] = useState<string>("interview");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [portfolioOrResumeUrl, setPortfolioOrResumeUrl] = useState("");
  const [currentRoleOrBackground, setCurrentRoleOrBackground] = useState("");
  const [notesOrAccessibility, setNotesOrAccessibility] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Selected Date and Slot
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Promo code simulator
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    // Detect user timezone
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) setTimeZone(userTz);
    } catch (e) {
      // fallback to UTC
    }

    // Load offer and slots
    Promise.all([
      fetch("/api/offer").then((res) => res.json()),
      fetch("/api/slots").then((res) => res.json()),
    ])
      .then(([offerData, slotsData]) => {
        setOffer(offerData);
        setSlots(slotsData);
        // Default select first available date
        const availableSlot = slotsData.find((s: TimeSlot) => s.isAvailable);
        if (availableSlot) {
          setSelectedDate(availableSlot.date);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load initial data:", err);
        setLoading(false);
      });
  }, []);

  // Filter slots for selected date
  const availableDates = Array.from(new Set(slots.map((s) => s.date))).sort();
  const currentDaySlots = slots.filter((s) => s.date === selectedDate);

  // Validate Step 1
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !primaryGoal.trim()) {
      setErrorMessage("Please fill in your name, email, and primary mentoring goal.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage("Please accept the terms and privacy notice to continue.");
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Validate Step 2
  const handleProceedToStep3 = () => {
    if (!selectedSlot) {
      setErrorMessage("Please select a time slot to continue.");
      return;
    }
    setErrorMessage("");
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Promo code apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "ANDROID10") {
      setPromoDiscount(500);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try 'ANDROID10' for ₹500 off.");
    }
  };

  // Submit Final Booking
  const handleFinalBooking = async () => {
    if (!offer || !selectedSlot) return;
    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          timeZone,
          primaryGoal,
          focusArea,
          portfolioOrResumeUrl,
          currentRoleOrBackground,
          notesOrAccessibility,
          slotDate: selectedSlot.date,
          slotTime: selectedSlot.time,
          slotId: selectedSlot.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Booking failed.");
      }

      // Redirect to success confirmation
      router.push(`/booking/success?ref=${data.booking.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to complete booking. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading booking calendar...</p>
        </div>
      </div>
    );
  }

  const finalAmount = Math.max(0, offer.currentPrice - promoDiscount);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to mentoring offer</span>
          </Link>
          <div className="text-xs sm:text-sm font-extrabold text-slate-900">
            Secure Booking Checkout
          </div>
          <Link
            href="/booking/cancelled"
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Cancel
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= 1
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-semibold mt-1 text-slate-700">Intake</span>
            </div>
            <div
              className={`flex-1 h-0.5 mx-2 ${
                step >= 2 ? "bg-slate-900" : "bg-slate-200"
              }`}
            />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= 2
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-semibold mt-1 text-slate-700">Schedule</span>
            </div>
            <div
              className={`flex-1 h-0.5 mx-2 ${
                step >= 3 ? "bg-slate-900" : "bg-slate-200"
              }`}
            />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= 3
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                3
              </div>
              <span className="text-[11px] font-semibold mt-1 text-slate-700">Review & Pay</span>
            </div>
          </div>
        </div>

        {/* Global Error Banner if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Step 1: Tell Us Your Goal & Background */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 1 of 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Tell us your goal for the session.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                This helps the mentor review your background and prepare personalized recommendations in advance.
              </p>
            </div>

            <form onSubmit={handleProceedToStep2} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Calendar invite and meeting link will be sent here.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Primary Focus Area *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "interview", label: "Mock Interview & System Design" },
                    { id: "architecture", label: "Jetpack Compose / Architecture Audit" },
                    { id: "career_roadmap", label: "Career Transition to Senior / Staff" },
                    { id: "resume_portfolio", label: "Resume & GitHub Project Review" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm font-medium transition-all ${
                        focusArea === opt.id
                          ? "border-emerald-600 bg-emerald-50/60 text-slate-900 font-bold"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="focusArea"
                        value={opt.id}
                        checked={focusArea === opt.id}
                        onChange={(e) => setFocusArea(e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  What is the #1 question or problem you want answered? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. I am interviewing for a Senior Android role next month and keep struggling with scaling offline-first caching and Compose state hoisting..."
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    GitHub / Resume / Portfolio URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={portfolioOrResumeUrl}
                    onChange={(e) => setPortfolioOrResumeUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Role / Years Experience (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mid-level Android dev (3 yrs)"
                    value={currentRoleOrBackground}
                    onChange={(e) => setCurrentRoleOrBackground(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Timezone
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold">{timeZone}</span>
                  <span className="text-slate-400 text-xs">(Auto-detected)</span>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    I understand that scheduling is confirmed upon booking, and I agree to the{" "}
                    <Link href="/privacy" className="text-emerald-700 underline font-semibold" target="_blank">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-emerald-700 underline font-semibold" target="_blank">
                      Terms of Service
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Submit to Step 2 */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Continue to choose session time</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Choose Slot */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 2 of 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Select your 90-minute session slot.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Times displayed in your local timezone ({timeZone}).
              </p>
            </div>

            {/* Date Selector Row */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose a Date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((dateStr) => {
                  const d = new Date(dateStr + "T00:00:00");
                  const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
                  const dayNum = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setSelectedSlot(null);
                      }}
                      className={`min-w-[85px] p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50 text-slate-900 font-bold shadow-xs ring-1 ring-emerald-500"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        {dayName}
                      </span>
                      <span className="text-sm font-extrabold mt-0.5">{dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Available Times on {selectedDate} ({offer.durationMinutes} min call)
              </label>
              {currentDaySlots.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
                  No slots available on this day. Please select another date above.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentDaySlots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          !slot.isAvailable
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500"
                            : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected slot summary pill */}
            {selectedSlot && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">Selected time: </span>
                  {selectedSlot.date} at {selectedSlot.time} ({offer.durationMinutes} min session)
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!selectedSlot}
                onClick={handleProceedToStep3}
                className={`flex-1 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all ${
                  selectedSlot
                    ? "bg-slate-900 hover:bg-emerald-600 text-white cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Continue to review & checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Mock Checkout */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 3 of 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Order Review & Checkout
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Verify your session details and complete your booking.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 mb-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{offer.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {offer.durationMinutes} min private video call · Written summary · 14-day email support
                  </div>
                </div>
                <div className="text-right font-black text-slate-900 text-lg">
                  {offer.currencySymbol}{offer.currentPrice.toLocaleString()}
                </div>
              </div>

              {/* Scheduled Time info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Date & Time:</span>
                  <span className="font-bold text-slate-900">
                    {selectedSlot?.date} at {selectedSlot?.time} ({timeZone})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Attendee:</span>
                  <span className="font-bold text-slate-900">
                    {fullName} ({email})
                  </span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-slate-200">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. ANDROID10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 uppercase outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <span className="text-xs text-emerald-600 font-semibold block mt-1">
                    ✓ Promo applied! ₹500 discount added.
                  </span>
                )}
                {promoError && (
                  <span className="text-xs text-red-600 font-semibold block mt-1">
                    {promoError}
                  </span>
                )}
              </div>

              {/* Final Pricing breakdown */}
              <div className="pt-3 border-t border-slate-200 text-xs sm:text-sm space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Standard Session Rate:</span>
                  <span>{offer.currencySymbol}{offer.currentPrice.toLocaleString()}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>-{offer.currencySymbol}{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due Today:</span>
                  <span className="text-xl text-emerald-700">
                    {offer.currencySymbol}{finalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Secure Checkout Simulated Payment */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Payment Method
                </span>
                <span className="ml-auto text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                  Test/Live Checkout Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Card details, UPI, and international checkout processed via 256-bit encrypted gateway.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted Instant Confirmation</span>
                </div>
                <span className="text-emerald-700 font-bold">Guaranteed</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalBooking}
                className="flex-1 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing your booking...
                  </span>
                ) : (
                  <span>
                    Pay {offer.currencySymbol}{finalAmount.toLocaleString()} & Confirm Booking
                  </span>
                )}
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full refund guarantee if not satisfied in first 15 mins.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

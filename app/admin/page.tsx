"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  Calendar,
  Settings,
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  Save,
  AlertCircle,
  RefreshCw,
  Edit,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Booking, Offer, TimeSlot } from "@/lib/types";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "offer" | "slots">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOffer, setSavingOffer] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  // Editable Offer state
  const [offerForm, setOfferForm] = useState({
    title: "",
    subtitle: "",
    durationMinutes: 90,
    currentPrice: 4999,
    originalPrice: 7999,
    currencySymbol: "₹",
    cancellationRules: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, offerRes, slotsRes] = await Promise.all([
        fetch("/api/bookings").then((r) => r.json()),
        fetch("/api/offer").then((r) => r.json()),
        fetch("/api/slots").then((r) => r.json()),
      ]);
      setBookings(bookingsRes);
      setOffer(offerRes);
      setSlots(slotsRes);

      if (offerRes) {
        setOfferForm({
          title: offerRes.title,
          subtitle: offerRes.subtitle,
          durationMinutes: offerRes.durationMinutes,
          currentPrice: offerRes.currentPrice,
          originalPrice: offerRes.originalPrice,
          currencySymbol: offerRes.currencySymbol,
          cancellationRules: offerRes.cancellationRules,
        });
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Booking["status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingOffer(true);
    setSaveSuccess("");
    try {
      const res = await fetch("/api/offer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerForm),
      });
      const data = await res.json();
      if (res.ok) {
        setOffer(data.offer);
        setSaveSuccess("Offer settings saved successfully! Live site updated.");
        setTimeout(() => setSaveSuccess(""), 4000);
      }
    } catch (err) {
      console.error("Failed to save offer:", err);
    } finally {
      setSavingOffer(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <span className="text-slate-700">|</span>
            <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Mentorship Owner Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono">Live Sync Active</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "bookings"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("offer")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "offer"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Offer & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab("slots")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "slots"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Slots ({slots.filter((s) => s.isAvailable).length} open)</span>
          </button>

          <button
            onClick={fetchData}
            title="Refresh Data"
            className="ml-auto p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Tab 1: Bookings List */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Client Bookings & Intakes
                </h2>
                <p className="text-xs text-slate-500">
                  Manage confirmed appointments, view questionnaire responses, and update session states.
                </p>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
                <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-700 text-base">No bookings yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  When visitors book a mentoring session from the landing page, their intake responses and payment receipts will appear here.
                </p>
                <Link
                  href="/book"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Create a test booking
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => {
                  const isExpanded = expandedBookingId === b.id;
                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      {/* Booking Card Header */}
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {b.customerName ? b.customerName.charAt(0).toUpperCase() : "M"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-900 text-base">
                                {b.customerName}
                              </h3>
                              <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {b.id}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                {b.customerEmail}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {b.slotDate} at {b.slotTime} ({b.timeZone})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status selector & Actions */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              handleUpdateStatus(b.id, e.target.value as Booking["status"])
                            }
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none ${
                              b.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : b.status === "completed"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : b.status === "rescheduled"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : "bg-red-50 text-red-800 border-red-300"
                            }`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              setExpandedBookingId(isExpanded ? null : b.id)
                            }
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            title="Toggle details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Intake Answers */}
                      {isExpanded && (
                        <div className="bg-slate-50 p-5 border-t border-slate-200/80 text-xs sm:text-sm space-y-4 animate-in fade-in duration-150">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-slate-400 text-xs font-semibold uppercase block">
                                Primary Objective & Question:
                              </span>
                              <p className="mt-1 text-slate-800 font-medium bg-white p-3 rounded-xl border border-slate-200">
                                {b.primaryGoal}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <span className="text-slate-400 text-xs font-semibold uppercase block">
                                  Focus Area:
                                </span>
                                <span className="font-bold text-slate-800 uppercase text-xs">
                                  {b.focusArea}
                                </span>
                              </div>

                              {b.portfolioOrResumeUrl && (
                                <div>
                                  <span className="text-slate-400 text-xs font-semibold uppercase block">
                                    Resume / GitHub Link:
                                  </span>
                                  <a
                                    href={b.portfolioOrResumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-700 underline font-semibold flex items-center gap-1 mt-0.5"
                                  >
                                    <span>{b.portfolioOrResumeUrl}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              )}

                              {b.currentRoleOrBackground && (
                                <div>
                                  <span className="text-slate-400 text-xs font-semibold uppercase block">
                                    Background / Experience:
                                  </span>
                                  <p className="text-slate-800">{b.currentRoleOrBackground}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">Video Meeting:</span>
                              <a
                                href={b.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-emerald-700 underline"
                              >
                                {b.meetingLink}
                              </a>
                            </div>
                            <div className="text-slate-400">
                              Paid: {b.currency} {b.amountPaid} · Ref: {b.paymentReference}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Offer & Pricing Editor */}
        {activeTab === "offer" && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Offer & Pricing Configuration
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Changes made here immediately update the live sales page and checkout price without editing code.
              </p>
            </div>

            {saveSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{saveSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveOffer} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Offer Title
                </label>
                <input
                  type="text"
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={offerForm.subtitle}
                  onChange={(e) => setOfferForm({ ...offerForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Selling Price (Live)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">
                      {offerForm.currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={offerForm.currentPrice}
                      onChange={(e) =>
                        setOfferForm({ ...offerForm, currentPrice: Number(e.target.value) })
                      }
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Original Price (Strike-through)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">
                      {offerForm.currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={offerForm.originalPrice}
                      onChange={(e) =>
                        setOfferForm({ ...offerForm, originalPrice: Number(e.target.value) })
                      }
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={offerForm.durationMinutes}
                    onChange={(e) =>
                      setOfferForm({ ...offerForm, durationMinutes: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={offerForm.currencySymbol}
                    onChange={(e) =>
                      setOfferForm({ ...offerForm, currencySymbol: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cancellation & Refund Guarantee Note
                </label>
                <textarea
                  rows={2}
                  value={offerForm.cancellationRules}
                  onChange={(e) =>
                    setOfferForm({ ...offerForm, cancellationRules: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={savingOffer}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingOffer ? "Saving Changes..." : "Save Offer Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Slots Manager */}
        {activeTab === "slots" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Active Appointment Time Slots
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Calendar slots automatically update when booked by customers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {slots.map((s) => (
                <div
                  key={s.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    s.isAvailable
                      ? "bg-slate-50 border-slate-200"
                      : "bg-red-50/60 border-red-200 text-red-700"
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{s.date}</div>
                    <div className="text-slate-500">{s.time}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      s.isAvailable
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.isAvailable ? "Open" : "Booked"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

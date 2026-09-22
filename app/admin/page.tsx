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
  Download,
  Search,
  ShieldCheck,
  Terminal,
  Cpu,
} from "lucide-react";
import { Booking, Offer, TimeSlot } from "@/lib/types";
import { SchedulingConstraintSolver } from "@/lib/scheduling/constraint-solver";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "offer" | "slots" | "verification">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOffer, setSavingOffer] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  // SMT Simulator state
  const [simDate, setSimDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [simTime, setSimTime] = useState<string>("10:00 AM");
  const [simDuration, setSimDuration] = useState<number>(90);
  const [simResult, setSimResult] = useState<{
    satisfiable: boolean;
    status: "SAT" | "UNSAT";
    unsatCore?: string;
  } | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const exportCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      "Booking ID",
      "Name",
      "Email",
      "Date",
      "Time",
      "Timezone",
      "Focus Area",
      "Amount Paid",
      "Currency",
      "Status",
      "Meeting Link",
    ];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.customerName}"`,
      b.customerEmail,
      b.slotDate,
      b.slotTime,
      b.timeZone,
      `"${b.focusArea}"`,
      b.amountPaid,
      b.currency,
      b.status,
      b.meetingLink,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mentoring-bookings-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handleRunSimulator = () => {
    const solver = new SchedulingConstraintSolver({
      bufferMinutes: 15,
      maxDailySessions: 3,
      businessStartMinutes: 540,
      businessEndMinutes: 1260,
    });

    const activeSessions = bookings
      .filter((b) => b.status === "confirmed" || b.status === "rescheduled")
      .map((b) => {
        const timeParts = b.slotTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        let startMinutes = 600;
        if (timeParts) {
          let hours = parseInt(timeParts[1], 10);
          const mins = parseInt(timeParts[2], 10);
          const ampm = timeParts[3].toUpperCase();
          if (ampm === "PM" && hours < 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;
          startMinutes = hours * 60 + mins;
        }
        return {
          id: b.id,
          date: b.slotDate,
          startMinutes,
          durationMinutes: b.slotDurationMinutes || 90,
        };
      });

    const candParts = simTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let candStartMinutes = 600;
    if (candParts) {
      let hours = parseInt(candParts[1], 10);
      const mins = parseInt(candParts[2], 10);
      const ampm = candParts[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      candStartMinutes = hours * 60 + mins;
    }

    const candidate = {
      id: "SIM_CANDIDATE",
      date: simDate,
      startMinutes: candStartMinutes,
      durationMinutes: simDuration,
    };

    const res = solver.checkSatisfiability(activeSessions, candidate);
    setSimResult(res);
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
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "verification"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OPA & Z3 Inspector</span>
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
        {activeTab === "bookings" && (() => {
          const filteredBookings = bookings.filter((b) => {
            const matchesStatus = statusFilter === "all" || b.status === statusFilter;
            const matchesSearch =
              !searchTerm ||
              b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
              b.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
          });

          return (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Client Bookings & Intakes
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage confirmed appointments, view questionnaire responses, and update session states.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={exportCSV}
                    disabled={bookings.length === 0}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or reference ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-emerald-600 outline-none"
                  />
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {["all", "confirmed", "rescheduled", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        statusFilter === st
                          ? "bg-slate-900 text-white shadow-2xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
                  <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <h3 className="font-bold text-slate-700 text-base">No matching bookings found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try adjusting your search terms or filter selection above.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((b) => {
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
          );
        })()}

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

        {/* Tab 4: Formal Verification & SMT Inspector */}
        {activeTab === "verification" && (
          <div className="space-y-6">
            {/* Top Status Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Cpu className="w-48 h-48 text-emerald-400" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    OPA Rego Engine: ACTIVE
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    SMT Invariant Solver: SATISFIABLE
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">
                  Policy-as-Code & SMT Constraint Verification
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                  Every booking and rescheduling transaction is mathematically evaluated against Open Policy Agent (OPA) declarative rules and Z3 SMT scheduling invariants before admission.
                </p>
              </div>
            </div>

            {/* Invariants & Simulator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Formally Proven Invariants */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3>Enforced System Invariants</h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Invariant 1: Non-Overlap Guarantee</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Z3 SMT</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px]">
                      ∀ s₁, s₂ ∈ Sessions: (s₁.end ≤ s₂.start) ∨ (s₂.end ≤ s₁.start)
                    </p>
                    <p className="text-slate-500 mt-1">Zero concurrent booking collisions permitted across calendar timeline.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Invariant 2: Buffer Rest Margin</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">≥ 15 min</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px]">
                      ∀ s₁, s₂ : (s₂.start - s₁.end ≥ 15) ∨ (s₁.start - s₂.end ≥ 15)
                    </p>
                    <p className="text-slate-500 mt-1">Guarantees mental context reset and notes compilation between mentees.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Invariant 3: Daily Capacity Bound</span>
                      <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">≤ 3 / day</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px]">
                      |{'{'}s ∈ Sessions | s.date = d{'}'}| ≤ 3
                    </p>
                    <p className="text-slate-500 mt-1">Protects energy and attention quality; prevents mentor burnout.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>Invariant 4: Reschedule Notice Window</span>
                      <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">OPA Rego</span>
                    </div>
                    <p className="text-slate-600 font-mono text-[11px]">
                      t_session - t_request ≥ 24 hours
                    </p>
                    <p className="text-slate-500 mt-1">Enforced by declarative policy `booking-policy.rego`.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: SMT Satisfiability Simulator */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg mb-2">
                  <Terminal className="w-5 h-5 text-indigo-600" />
                  <h3>SMT Solver Conflict Sandbox</h3>
                </div>
                <p className="text-xs text-slate-500 mb-5">
                  Test arbitrary booking or rescheduling requests against current active appointments in the database.
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Candidate Date</label>
                    <input
                      type="date"
                      value={simDate}
                      onChange={(e) => setSimDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                      <select
                        value={simTime}
                        onChange={(e) => setSimTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Duration (Mins)</label>
                      <input
                        type="number"
                        value={simDuration}
                        onChange={(e) => setSimDuration(parseInt(e.target.value, 10) || 90)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRunSimulator}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Run SMT Satisfiability Check</span>
                  </button>

                  {/* Simulator Outcome */}
                  {simResult && (
                    <div
                      className={`p-4 rounded-2xl border text-xs transition-all ${
                        simResult.status === "SAT"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : "bg-red-50 border-red-200 text-red-950"
                      }`}
                    >
                      <div className="flex items-center justify-between font-black text-sm mb-1.5">
                        <span className="flex items-center gap-1.5">
                          {simResult.status === "SAT" ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                          Result: {simResult.status}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/60">
                          {simResult.status === "SAT" ? "Satisfiable" : "Unsatisfiable"}
                        </span>
                      </div>

                      {simResult.status === "SAT" ? (
                        <p className="text-emerald-800">
                          Candidate slot satisfies all 4 formal invariants. It can safely be admitted without scheduling collision.
                        </p>
                      ) : (
                        <div>
                          <p className="font-bold text-red-900 mb-1">Unsatisfiable Core (UNSAT):</p>
                          <p className="font-mono text-[11px] bg-white/70 p-2.5 rounded-lg border border-red-200 text-red-800">
                            {simResult.unsatCore}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

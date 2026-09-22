import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw, Mail, ArrowRight } from "lucide-react";

export default function BookingCancelledPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Booking Incomplete
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-3">
            Your booking was cancelled
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            No charges were made to your account. Your slot was not reserved yet. If this was an accident or you experienced an issue with checkout, you can easily restart your booking.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/book"
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try booking again</span>
          </Link>

          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to overview</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
          <Mail className="w-4 h-4 text-slate-400" />
          <span>Need help? Contact support@mentoringandroid.dev</span>
        </div>
      </div>
    </div>
  );
}

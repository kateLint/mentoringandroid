"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Offer } from "../lib/types";

interface StickyMobileBarProps {
  offer: Offer;
}

export default function StickyMobileBar({ offer }: StickyMobileBarProps) {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl safe-bottom">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-950">
              {offer.currencySymbol}{offer.currentPrice.toLocaleString()}
            </span>
            <span className="text-xs text-slate-600 line-through">
              {offer.currencySymbol}{offer.originalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600 inline" />
            {offer.durationMinutes} min 1:1 call
          </span>
        </div>

        <Link
          href="/book"
          className="flex-1 max-w-[200px] min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-900 active:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors"
          aria-label="Book mentoring session"
        >
          <span>Book now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

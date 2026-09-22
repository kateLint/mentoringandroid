"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Clock, CheckCircle2, BookOpen } from "lucide-react";
import { CurriculumBlock } from "../lib/types";

interface CurriculumSectionProps {
  curriculum: CurriculumBlock[];
}

export default function CurriculumSection({ curriculum }: CurriculumSectionProps) {
  // Track open state of rows; default first open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleRow = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="curriculum" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>90-Minute Agenda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How we spend our 90 minutes.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Every minute is intentionally planned so you leave with total confidence, actionable code changes, and a customized roadmap.
          </p>
        </div>

        {/* Agenda Accordion / Table */}
        <div className="space-y-4">
          {curriculum.map((block, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-slate-50/80 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleRow(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 font-mono text-xs sm:text-sm font-bold w-fit">
                      {block.timeRange}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {block.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expandable Details */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-slate-700 border-t border-slate-200/60 animate-in fade-in duration-200">
                    <p className="text-sm sm:text-base text-slate-600 mb-4 font-medium">
                      {block.description}
                    </p>
                    <div className="space-y-2.5 bg-white rounded-xl p-4 border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included in this block:
                      </span>
                      {block.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-500">
          Note: Agendas are flexible and customized based on your pre-session intake responses.
        </div>
      </div>
    </section>
  );
}

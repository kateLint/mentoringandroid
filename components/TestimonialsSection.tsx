import React from "react";
import { Quote, Star, CheckCircle, Trophy, Sparkles } from "lucide-react";
import { Testimonial } from "../lib/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const takeaways = [
    {
      title: "Clean Architecture Blueprint",
      description: "A diagrammed module hierarchy tailored to your project's scaling requirements.",
    },
    {
      title: "Interview Readiness Checklist",
      description: "Specific frameworks for answering concurrency, lifecycle, and system design challenges.",
    },
    {
      title: "Resume & Portfolio Upgrades",
      description: "Direct edits on how to phrase impact, metrics, and technical leadership.",
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Participant Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Real outcomes from focused sessions.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            See how single 90-minute strategy sessions have helped engineers unlock offers and level up architecture.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center gap-1 text-emerald-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-200 mb-3" />
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.author}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.role}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{item.companyOrContext}</div>
                </div>
                {item.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* What You Leave With Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-android-dark text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Guaranteed Deliverable
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              What you will leave the session with:
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              You won&apos;t just talk for 90 minutes. You receive concrete deliverables right in your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {takeaways.map((t, idx) => (
              <div key={idx} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">{t.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

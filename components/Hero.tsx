import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Video, Calendar, ArrowRight, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import { MentorProfile, Offer } from "../lib/types";

interface HeroProps {
  mentor: MentorProfile;
  offer: Offer;
}

export default function Hero({ mentor, offer }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/60">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Personal 1:1 Engineering Mentorship</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Make your next career move with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900">
                clear, actionable plan.
              </span>
            </h1>

            {/* Lead Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Bring your interview questions, architecture hurdles, career decisions, resume, or portfolio to a focused one-to-one conversation. Together we identify the gaps that matter and map out a practical roadmap for the weeks ahead.
            </p>

            {/* Key Facts Pill Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{offer.durationMinutes} minutes dedicated call</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Live 1:1 private video</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Scheduled around your availability</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-base shadow-lg hover:bg-emerald-600 hover:shadow-glow transition-all duration-200 group"
              >
                <span>Book your session</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-400 transition-colors"
              >
                See session breakdown
              </Link>
            </div>

            {/* Trust and Assurance */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Satisfaction or full refund
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Written roadmap & resources included
              </span>
            </div>
          </div>

          {/* Right Column: Mentor Highlight Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-gradient-to-br from-emerald-400/20 to-teal-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Mentor Avatar Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md flex-shrink-0">
                  <img
                    src={mentor.portraitUrl}
                    alt={`${mentor.name} - ${mentor.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Verified Mentor
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{mentor.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{mentor.title}</p>
                </div>
              </div>

              {/* Verified Metrics / Credentials */}
              <div className="grid grid-cols-2 gap-3 py-3 mb-5 border-y border-slate-100 bg-slate-50/70 rounded-xl p-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">{mentor.yearsExperience}+</div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-600">{mentor.menteesHelped}+</div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase">Engineers Coached</div>
                </div>
              </div>

              {/* Credentials highlights */}
              <div className="space-y-2.5 mb-6 text-xs text-slate-600">
                {mentor.credentials.slice(0, 3).map((cred, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Quick Card Action */}
              <Link
                href="/book"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Book 1:1 with {mentor.name.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

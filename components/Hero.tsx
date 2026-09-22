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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 graph-paper border-b border-slate-300/80 dark:border-slate-800">
      {/* Subtle vignette/glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop & Booking Info */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Handwritten Eyebrow Sticker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-handwriting text-base text-slate-800 dark:text-slate-200">Personal 1:1 Engineering Mentorship</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Make your next career move with a{" "}
              <span className="relative inline-block text-emerald-800 dark:text-emerald-400 underline decoration-wavy decoration-emerald-500/40 underline-offset-4">
                clear, actionable plan.
              </span>
            </h1>

            {/* Lead Description in a clean reading card */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-xs shadow-xs">
              Bring your interview questions, architecture hurdles, career decisions, resume, or portfolio to a focused one-to-one conversation. Together we identify the gaps that matter and map out a practical roadmap for the weeks ahead.
            </p>

            {/* Key Facts Pill Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{offer.durationMinutes} min call</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Live 1:1 private video</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Flexible scheduling</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-200 group"
              >
                <span>Book your session</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white/90 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-white transition-colors shadow-xs"
              >
                See breakdown
              </Link>
            </div>

            {/* Trust and Assurance */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                100% Satisfaction guarantee
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Tailored roadmap included
              </span>
            </div>
          </div>

          {/* Right Column: Indie Scrapbook & Polaroid Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] flex flex-col items-center">

              {/* Handwritten Title at Top (matches reference image style) */}
              <div className="font-handwriting text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-wider mb-3 text-center select-none transform -rotate-1">
                {mentor.name}
              </div>

              {/* Doodle Arrow Left (curly tail pointing to photo) */}
              <div className="hidden sm:flex absolute -left-4 top-16 z-20 flex-col items-center select-none pointer-events-none">
                <span className="font-handwriting text-sm font-bold text-slate-700 dark:text-slate-300 -rotate-12 bg-white/70 dark:bg-slate-800/80 px-2 py-0.5 rounded-md shadow-xs">
                  {mentor.yearsExperience}+ Yrs Exp
                </span>
                <svg className="w-10 h-10 text-slate-700 dark:text-slate-300 -rotate-12 mt-1" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8 C 24 6, 32 16, 22 26 C 14 34, 28 40, 38 38" />
                  <polyline points="32 32 38 38 32 44" />
                </svg>
              </div>

              {/* Doodle Arrow Right (curly tail pointing to photo) */}
              <div className="hidden sm:flex absolute -right-4 top-20 z-20 flex-col items-center select-none pointer-events-none">
                <span className="font-handwriting text-sm font-bold text-slate-700 dark:text-slate-300 rotate-12 bg-white/70 dark:bg-slate-800/80 px-2 py-0.5 rounded-md shadow-xs">
                  {mentor.menteesHelped}+ Coached
                </span>
                <svg className="w-10 h-10 text-slate-700 dark:text-slate-300 rotate-12 mt-1" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M38 8 C 26 6, 18 16, 28 26 C 36 34, 22 40, 12 38" />
                  <polyline points="18 32 12 38 18 44" />
                </svg>
              </div>

              {/* The Polaroid Card */}
              <div className="relative polaroid-frame p-3.5 sm:p-4 pb-8 sm:pb-10 rounded-sm w-[290px] sm:w-[340px] transform -rotate-3 hover:rotate-0 transition-transform duration-300 ease-out">
                
                {/* Washi Tape Strip: Top-Left */}
                <div className="absolute -top-3 left-6 w-20 h-6 washi-tape -rotate-12 z-20 pointer-events-none" />

                {/* Washi Tape Strip: Top-Right */}
                <div className="absolute -top-3 right-6 w-20 h-6 washi-tape rotate-12 z-20 pointer-events-none" />

                {/* Inner Photo */}
                <div className="relative w-full aspect-[4/4.2] overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={mentor.portraitUrl}
                    alt={mentor.name}
                    className="w-full h-full object-cover select-none"
                  />
                  {/* Subtle film glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Polaroid Bottom White Lip with Handwritten Text */}
                <div className="pt-4 pb-1 px-1 text-center select-none font-handwriting">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    ארכיטקטית מערכות אנדרואיד
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-600 mt-0.5">
                    Staff Android Architect & System Mentor
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Row: Social Badges (Left) & Email Pill (Right) */}
              <div className="w-full flex items-center justify-between mt-6 px-2 sm:px-4">
                
                {/* Left: Stacked/Row Circular Social Badges */}
                <div className="flex items-center gap-2.5">
                  <a
                    href={mentor.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href={mentor.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>

                {/* Right: Black Email Pill Badge (matches reference image) */}
                <a
                  href="mailto:kate@mentoringandroid.dev"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-medium shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] tracking-tight">kate@mentoringandroid.dev</span>
                </a>

              </div>

              {/* Direct Booking CTA below the Polaroid card */}
              <div className="mt-5 w-full max-w-[340px]">
                <Link
                  href="/book"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Book 1:1 with {mentor.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

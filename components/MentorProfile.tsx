import React from "react";
import Link from "next/link";
import { CheckCircle2, Linkedin, Github, ExternalLink, Award, Code, Smartphone } from "lucide-react";
import { MentorProfile as MentorType } from "../lib/types";

interface MentorProfileProps {
  mentor: MentorType;
}

export default function MentorProfile({ mentor }: MentorProfileProps) {
  const techPills = [
    "Kotlin Multiplatform (KMP)",
    "Jetpack Compose",
    "Coroutines & Flow",
    "Mobile System Design",
    "Clean Architecture / MVI",
    "Gradle & CI/CD Pipelines",
    "Modularization at Scale",
    "App Performance & Memory",
  ];

  return (
    <section id="mentor" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Mentor Polaroid & Scrapbook Accents */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            {/* Polaroid Container */}
            <div className="relative polaroid-frame p-3.5 sm:p-4 pb-8 sm:pb-10 rounded-sm w-[280px] sm:w-[320px] transform rotate-2 hover:rotate-0 transition-transform duration-300 ease-out mb-6">
              {/* Washi tape at top */}
              <div className="absolute -top-3 left-10 w-24 h-6 washi-tape -rotate-6 z-20 pointer-events-none" />

              {/* Photo */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={mentor.portraitUrl}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="pt-3 pb-1 text-center font-handwriting">
                <div className="text-xl font-bold text-slate-900 leading-tight">
                  {mentor.name}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  {mentor.title}
                </div>
              </div>
            </div>

            {/* Verified Profile Links & Contact Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={mentor.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href={mentor.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <Github className="w-4 h-4 text-slate-900 dark:text-white" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="mailto:kate@mentoringandroid.dev"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px]">kate@mentoringandroid.dev</span>
              </a>
            </div>
          </div>

          {/* Right: Bio & Verified Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Meet your mentor
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                {mentor.name}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-emerald-700 mt-1">
                {mentor.title}
              </p>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {mentor.bio}
            </p>

            {/* Credentials Checklist */}
            <div className="space-y-3 bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Career Credentials:
              </h4>
              <div className="space-y-2.5">
                {mentor.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Tags */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Specialized Technical Expertise:
              </h4>
              <div className="flex flex-wrap gap-2">
                {techPills.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

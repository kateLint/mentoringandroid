import React from "react";
import { Code2, Briefcase, FileText, Compass, AlertCircle, CheckCircle } from "lucide-react";

export default function WhoIsItFor() {
  const personas = [
    {
      icon: Code2,
      title: "Technical Interview Candidates",
      description:
        "Preparing for upcoming mobile system design, live coding, or architecture rounds at tech companies and scale-ups.",
    },
    {
      icon: Briefcase,
      title: "Engineers Aiming for Senior / Staff",
      description:
        "Mid-level or senior Android developers hitting a growth ceiling who want to master high-level design and cross-team leadership.",
    },
    {
      icon: FileText,
      title: "Resume & Portfolio Audit Seekers",
      description:
        "Engineers who want actionable, ruthless feedback on how their projects, GitHub code, and LinkedIn profile are perceived by engineering directors.",
    },
    {
      icon: Compass,
      title: "Engineers Navigating Modern Android & KMP",
      description:
        "Developers transitioning into modern Kotlin Multiplatform, Compose, Coroutines/Flow, or modularized multi-module architecture.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Target Audience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Who this session helps.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Whether you are targeting an immediate interview or planning your next 12-month engineering trajectory.
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ideal fit for 1:1</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Qualification Note */}
        <div className="mt-10 max-w-2xl mx-auto bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-slate-800">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-amber-900">Qualification note: </span>
            To get the maximum value out of our 90 minutes, please bring{" "}
            <strong>one or two concrete priorities</strong> (such as your specific interview topic, code repo, or career question) to focus our session.
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Compass, Target, Layers, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const outcomes = [
    {
      icon: Compass,
      title: "A Clearer Goal",
      description:
        "Strip away the noise of endless tutorials and contradictory online advice. We zero in on your target level (Senior, Staff, or Lead) and what companies actually evaluate.",
      badge: "Clarity & Direction",
    },
    {
      icon: Target,
      title: "Specific, Honest Feedback",
      description:
        "Get candid, line-by-line feedback on your GitHub repositories, Compose architecture, or how you answer system design questions in live interviews.",
      badge: "Direct Audit",
    },
    {
      icon: Layers,
      title: "A Practical Next-Step Plan",
      description:
        "Leave the session with a written, milestone-based roadmap. You will know exactly what to code, build, or study during the next 4 to 12 weeks.",
      badge: "Actionable Execution",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About the session
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            A useful conversation, tailored to you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We start with the exact challenge you want to solve. Together we review your current position, identify the gaps that matter, and choose a realistic set of actions for the next few weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-200/60 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>Included in 90-min session</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

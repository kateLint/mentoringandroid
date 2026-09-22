import React from "react";
import { Video, ClipboardList, CheckSquare, FileText, Library, Mail } from "lucide-react";

export default function InclusionsSection() {
  const inclusions = [
    {
      icon: Video,
      title: "1:1 Private Video Call",
      description: "90 minutes of dedicated time with no interruptions. Share screen, live code, or diagram architectures.",
    },
    {
      icon: ClipboardList,
      title: "Pre-Session Intake Audit",
      description: "Submit your resume, GitHub repo, or design doc in advance so we hit the ground running with zero wasted time.",
    },
    {
      icon: CheckSquare,
      title: "Direct Technical Feedback",
      description: "Objective evaluation of your technical skills, code patterns, and interview presentation style.",
    },
    {
      icon: FileText,
      title: "Written Action Plan",
      description: "A tailored post-session document capturing key discussion points, immediate milestones, and strategic recommendations.",
    },
    {
      icon: Library,
      title: "Curated Resource Library",
      description: "Specific Android, Kotlin, and architecture code snippets, documentation, and mock problem sheets tailored to your goals.",
    },
    {
      icon: Mail,
      title: "14-Day Email Follow-Up",
      description: "Direct email access to the mentor for two weeks after your call to answer implementation questions and unblock you.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Complete Deliverables
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            What is included with your session.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Everything you need before, during, and after our call to make measurable progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

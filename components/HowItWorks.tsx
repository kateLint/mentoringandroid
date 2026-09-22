import React from "react";
import { FileEdit, CreditCard, CalendarCheck, Video, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "1",
      icon: FileEdit,
      title: "Tell us your goal",
      description: "Complete a 2-minute intake form noting your top 1-2 goals, questions, or project links.",
    },
    {
      stepNumber: "2",
      icon: CalendarCheck,
      title: "Choose your time",
      description: "Pick an available date and time on our calendar that fits your local timezone.",
    },
    {
      stepNumber: "3",
      icon: CreditCard,
      title: "Confirm & Checkout",
      description: "Lock in your appointment through a safe, encrypted checkout with instant receipt.",
    },
    {
      stepNumber: "4",
      icon: Video,
      title: "Join the private call",
      description: "Connect via private Google Meet with screen sharing, live code analysis, and recording.",
    },
    {
      stepNumber: "5",
      icon: FileCheck,
      title: "Receive your roadmap",
      description: "Get your personalized written action plan and enjoy 14 days of direct email follow-up.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How it works from start to finish.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            No confusion or friction. Book your slot in 2 minutes and arrive fully prepared.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-white hover:shadow-md transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                      {step.stepNumber}
                    </span>
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Trigger */}
        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all group"
          >
            <span>Start your booking</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

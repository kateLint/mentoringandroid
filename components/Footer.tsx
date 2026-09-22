import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Mail, Shield, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Pre-Footer Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center border-b border-slate-800/80">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to make a plan for your next step?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Book a focused 90-minute session and leave with actions you can start executing this week.
          </p>
          <div className="pt-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 transition-all group"
            >
              <span>Book your 1:1 session now</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Smartphone className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-extrabold text-white text-base">
                AndroidEngineers<span className="text-emerald-400">.1on1</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              High-impact 1:1 mentorship for Android and mobile software engineers. Master architecture, prepare for staff-level interviews, and build realistic career roadmaps.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>support@mentoringandroid.dev</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#curriculum" className="hover:text-white transition-colors">
                  90-Minute session plan
                </Link>
              </li>
              <li>
                <Link href="/#mentor" className="hover:text-white transition-colors">
                  Your mentor
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-white transition-colors">
                  Outcomes & proof
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Guides & Interview Questions
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-emerald-400 transition-colors text-emerald-500 font-semibold">
                  Career Diagnostic Quiz
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Book appointment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Owner Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-white transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {currentYear} AndroidEngineers 1:1 Mentorship. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for Android engineering excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

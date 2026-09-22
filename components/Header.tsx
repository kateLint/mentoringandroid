"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles, Smartphone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-android-dark to-slate-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Limited 1:1 mentoring appointments open for this month.</span>
        <Link
          href="/#booking"
          className="underline hover:text-emerald-400 font-semibold inline-flex items-center gap-1 ml-1"
        >
          See session <ArrowRight className="w-3 h-3 inline" />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-android-green to-emerald-600 flex items-center justify-center text-slate-950 font-bold shadow-md group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight">
                AndroidEngineers<span className="text-emerald-600">.1on1</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                Career & Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link
              href="/#how-it-works"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              How it works
            </Link>
            <Link
              href="/#curriculum"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Session plan
            </Link>
            <Link
              href="/#mentor"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Your mentor
            </Link>
            <Link
              href="/resources"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Guides & Sheets
            </Link>
            <Link
              href="/assessment"
              className="hover:text-emerald-600 transition-colors py-2 text-emerald-700 font-bold"
            >
              Diagnostic Quiz
            </Link>
            <Link
              href="/#faq"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-md hover:bg-emerald-600 hover:shadow-glow transition-all duration-200 group"
            >
              <span>Book a session</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/book"
              className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              How it works
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Session plan (90 min)
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#mentor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Your mentor
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Architecture Guides & Questions
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-emerald-800 font-bold bg-emerald-50/60 hover:bg-emerald-100 flex items-center justify-between text-base"
            >
              Career Diagnostic Quiz
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link
              href="/#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Reviews & Outcomes
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              FAQ
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-center shadow-lg hover:bg-emerald-600 transition-colors"
            >
              Book your session now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

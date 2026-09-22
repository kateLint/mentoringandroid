"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, RefreshCw, Trophy, Target, Sparkles } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    points: number; // 1 = Mid, 2 = Senior, 3 = Staff
    focusRecommendation: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "When designing offline data synchronization in an Android app, how do you handle merge conflicts?",
    options: [
      {
        label: "I rely on basic 'last-write-wins' using timestamp comparisons on the server.",
        points: 1,
        focusRecommendation: "Offline Data Architecture & Conflict Resolution",
      },
      {
        label: "I use transaction IDs, version vectors, and an idempotent local queue in Room.",
        points: 2,
        focusRecommendation: "Production Concurrency & Distributed State",
      },
      {
        label: "I architect CRDTs / operational transforms and design multi-tiered fallback caches with RFC documentation.",
        points: 3,
        focusRecommendation: "Staff-Level System Design & Scaling",
      },
    ],
  },
  {
    id: 2,
    question: "How do you evaluate and optimize Jetpack Compose performance?",
    options: [
      {
        label: "I add remember {} blocks around variables when they cause bugs.",
        points: 1,
        focusRecommendation: "Jetpack Compose Recomposition & Memory Fundamentals",
      },
      {
        label: "I inspect Compose Compiler stability metrics, use derivedStateOf, and supply immutable data models.",
        points: 2,
        focusRecommendation: "Advanced Compose State Modeling & Layout Subcomposition",
      },
      {
        label: "I write custom Compose runtime wrappers, micro-benchmark frame times via Macrobenchmark, and establish lint rules.",
        points: 3,
        focusRecommendation: "Staff Platform Engineering & Performance Standards",
      },
    ],
  },
  {
    id: 3,
    question: "What is your approach to multi-module Android project structure?",
    options: [
      {
        label: "A single monolithic app module or simple 2-module split (app + core).",
        points: 1,
        focusRecommendation: "Modularization Fundamentals & Clean Architecture",
      },
      {
        label: "Feature-based modularization with inverted dependencies using Dagger/Hilt or Koin.",
        points: 2,
        focusRecommendation: "Dependency Inversion & Multi-Module Scaling",
      },
      {
        label: "Strict API vs Implementation module boundaries with custom Gradle convention plugins and cache isolation.",
        points: 3,
        focusRecommendation: "Staff Architectural Leadership & Build Systems",
      },
    ],
  },
  {
    id: 4,
    question: "How do you handle technical disagreements or major architectural decisions across teams?",
    options: [
      {
        label: "I discuss them in pull request comments or team standups.",
        points: 1,
        focusRecommendation: "Technical Communication & Architecture RFCs",
      },
      {
        label: "I draft a technical proposal with pros/cons and prototypes to align with my team.",
        points: 2,
        focusRecommendation: "Engineering Influence & System Tradeoffs",
      },
      {
        label: "I author formal RFCs/ADRs, conduct cross-organizational reviews, and mentor engineers across squads.",
        points: 3,
        focusRecommendation: "Staff Leadership & Cross-Functional Alignment",
      },
    ],
  },
];

export default function ReadinessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{
    level: string;
    description: string;
    recommendedFocus: string;
    scorePercent: number;
  } | null>(null);

  const handleSelectOption = (index: number) => {
    const updated = [...selectedAnswers, index];
    setSelectedAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate outcome
      calculateResult(updated);
    }
  };

  const calculateResult = (answers: number[]) => {
    let totalPoints = 0;
    const focusPicks: string[] = [];

    answers.forEach((ansIndex, qIndex) => {
      const option = questions[qIndex].options[ansIndex];
      totalPoints += option.points;
      focusPicks.push(option.focusRecommendation);
    });

    const maxPoints = questions.length * 3;
    const scorePercent = Math.round((totalPoints / maxPoints) * 100);

    let level = "Mid-Level Android Engineer";
    let description =
      "You have solid fundamentals and feature delivery skills. Your greatest leverage now is mastering production architecture, clean modularization, and advanced Compose state.";
    if (totalPoints >= 10) {
      level = "Staff / Principal Mobile Architect Ready";
      description =
        "You possess advanced architectural maturity. Your focus in our 1:1 session should center on cross-team technical strategy, system design interviews, and organizational influence.";
    } else if (totalPoints >= 7) {
      level = "Senior Android Engineer";
      description =
        "You write clean, modular code and understand reactive concurrency. To break through to Staff level, you need to elevate your system design frameworks and multi-team technical impact.";
    }

    setResult({
      level,
      description,
      recommendedFocus: focusPicks[0],
      scorePercent,
    });
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setResult(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
      {!result ? (
        <div>
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-8">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 leading-snug">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-slate-800 text-xs sm:text-sm font-medium transition-all group flex items-start justify-between gap-4"
              >
                <span>{option.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Assessment Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {result.level}
            </h2>
            <div className="text-xs font-bold text-emerald-700 mt-1">
              Readiness Index: {result.scorePercent}%
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-3 leading-relaxed">
              {result.description}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Recommended 1:1 Session Focus:</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {result.recommendedFocus}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Book 1:1 to Focus on This Area</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={restart}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Retake Diagnostic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

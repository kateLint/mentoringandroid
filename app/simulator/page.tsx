"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import {
  Code,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  Layers,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import {
  evaluateArchitecture,
  ArchitectureReviewInput,
  ArchitectureReviewReport,
} from "@/lib/simulator/engine";
import { defaultOffer } from "@/lib/data/default-content";

const SAMPLE_PRESETS: Record<string, { track: ArchitectureReviewInput["track"]; code: string; label: string }> = {
  composeAntiPattern: {
    track: "compose",
    label: "Compose: Un-remembered State & ViewModel Coupling",
    code: `@Composable
fun UserProfileScreen(viewModel: UserViewModel) {
    // ⚠️ Critical: unremembered state re-allocates on every recomposition
    var expanded = mutableStateOf(false)
    val userList = viewModel.users.collectAsState()

    LazyColumn {
        items(userList.value) { user ->
            UserCard(user = user, onClick = { expanded.value = !expanded.value })
        }
    }
}`,
  },
  coroutineLeak: {
    track: "coroutines",
    label: "Coroutines: GlobalScope & Blocking I/O Anti-Pattern",
    code: `class OrderRepository {
    fun syncOrders(token: String) {
        // ⚠️ Critical: GlobalScope breaks structured concurrency & leaks
        GlobalScope.launch {
            val fileStream = FileInputStream("/data/user/0/orders.cache")
            val buffer = BufferedReader(InputStreamReader(fileStream))
            val rawData = buffer.readText()
            // Missing withContext(Dispatchers.IO)
            processOrdersOnMain(rawData)
        }
    }
}`,
  },
  systemDesignGood: {
    track: "system-design",
    label: "System Design: Offline-First Room SSOT with WorkManager",
    code: `class FeedRepository @Inject constructor(
    private val localDao: FeedDao,
    private val api: FeedApiService,
    private val workManager: WorkManager
) {
    // Single Source of Truth via Room
    val feedStream: Flow<List<FeedItem>> = localDao.getFeedFlow()

    suspend fun enqueueSyncWithConflictResolution() {
        val syncRequest = OneTimeWorkRequestBuilder<SyncWorker>()
            .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
            .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 15, TimeUnit.SECONDS)
            .build()
        workManager.enqueueUniqueWork("feed_sync", ExistingWorkPolicy.KEEP, syncRequest)
    }
}`,
  },
};

export default function SimulatorPage() {
  const [track, setTrack] = useState<ArchitectureReviewInput["track"]>("compose");
  const [inputCode, setInputCode] = useState<string>(SAMPLE_PRESETS.composeAntiPattern.code);
  const [report, setReport] = useState<ArchitectureReviewReport | null>(() =>
    evaluateArchitecture({
      track: "compose",
      codeOrDescription: SAMPLE_PRESETS.composeAntiPattern.code,
    })
  );

  const handleAnalyze = () => {
    const result = evaluateArchitecture({
      track,
      codeOrDescription: inputCode,
    });
    setReport(result);
  };

  const loadPreset = (key: keyof typeof SAMPLE_PRESETS) => {
    const preset = SAMPLE_PRESETS[key];
    setTrack(preset.track);
    setInputCode(preset.code);
    setReport(evaluateArchitecture({ track: preset.track, codeOrDescription: preset.code }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb / Nav */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900">Architecture Review Simulator</span>
        </div>

        {/* Hero Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Android Evaluation Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Android Architecture & Code Quality Simulator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Test your Jetpack Compose components, Kotlin Coroutine patterns, and mobile system designs against the rigorous rubrics used in Staff & Principal Android technical interviews.
            </p>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Pre-loaded Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SAMPLE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className="px-3.5 py-2 min-h-[48px] rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-100/70 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Editor (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-sm text-slate-900">Evaluation Track</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setTrack("compose")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    track === "compose" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Compose
                </button>
                <button
                  onClick={() => setTrack("system-design")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    track === "system-design" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  System Design
                </button>
                <button
                  onClick={() => setTrack("coroutines")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    track === "coroutines" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Coroutines
                </button>
                <button
                  onClick={() => setTrack("custom")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    track === "custom" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All / Custom
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Kotlin Code or Architecture Description:
              </label>
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                rows={12}
                placeholder="Paste your Kotlin snippet, ViewModel, or system design outline..."
                className="w-full font-mono text-xs sm:text-sm p-4 rounded-2xl bg-slate-950 text-emerald-400 border border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAnalyze}
                className="flex-1 py-3.5 px-6 min-h-[48px] rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Evaluate Architecture</span>
              </button>
            </div>
          </div>

          {/* Right: Real-Time Report Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {report && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                {/* Score & Tier */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Calculated Readiness Tier
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      {report.level}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Rubric Score
                    </span>
                    <div
                      className={`text-2xl sm:text-3xl font-black ${
                        report.score >= 85
                          ? "text-emerald-600"
                          : report.score >= 70
                          ? "text-blue-600"
                          : report.score >= 50
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.score}/100
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  <p className="font-semibold">{report.summary}</p>
                </div>

                {/* Findings & Rule Violations */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Key Findings ({report.findings.length})</span>
                  </h3>

                  {report.findings.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Zero anti-patterns detected. Architecture meets high standards.</span>
                    </div>
                  ) : (
                    report.findings.map((f) => (
                      <div
                        key={f.id}
                        className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                          f.severity === "error"
                            ? "bg-red-50/60 border-red-200 text-red-950"
                            : f.severity === "warning"
                            ? "bg-amber-50/60 border-amber-200 text-amber-950"
                            : "bg-blue-50/60 border-blue-200 text-blue-950"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5">
                            {f.severity === "error" ? (
                              <AlertOctagon className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            )}
                            {f.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/70">
                            {f.id}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-90">{f.explanation}</p>
                        <div className="text-[11px] font-semibold pt-1 border-t border-black/5">
                          💡 <span className="underline">Fix:</span> {f.recommendation}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Mentor Feedback & Next Step */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs space-y-2">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Kate&apos;s Mentorship Recommendation</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">{report.mentorAdvice}</p>
                </div>

                {/* Direct CTA */}
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="w-full py-4 px-6 min-h-[48px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <span>Book 1:1 Architecture Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <StickyMobileBar offer={defaultOffer} />
    </div>
  );
}

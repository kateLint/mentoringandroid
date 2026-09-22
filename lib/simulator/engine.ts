export interface ArchitectureReviewInput {
  track: "compose" | "system-design" | "coroutines" | "custom";
  codeOrDescription: string;
}

export interface RuleViolation {
  id: string;
  category: string;
  severity: "error" | "warning" | "info";
  title: string;
  explanation: string;
  recommendation: string;
}

export interface ArchitectureReviewReport {
  score: number; // 0 to 100
  level: "Junior" | "Mid-Level" | "Senior" | "Staff / Principal";
  summary: string;
  strengths: string[];
  findings: RuleViolation[];
  mentorAdvice: string;
}

export function evaluateArchitecture(
  input: ArchitectureReviewInput
): ArchitectureReviewReport {
  const content = input.codeOrDescription.toLowerCase();
  const raw = input.codeOrDescription;
  const findings: RuleViolation[] = [];
  const strengths: string[] = [];

  // Track 1: Jetpack Compose State & Performance
  if (input.track === "compose" || input.track === "custom") {
    // Check 1: Mutating state inside composable body
    if (
      content.includes("mutablestateof(") &&
      !content.includes("remember { mutablestateof") &&
      !content.includes("remember(")
    ) {
      findings.push({
        id: "CMP-001",
        category: "Compose State",
        severity: "error",
        title: "Un-remembered MutableState in Composable Body",
        explanation:
          "Declaring `mutableStateOf` directly in a Composable function body without wrapping it in `remember` causes state to re-initialize on every single recomposition, losing mentee UI state.",
        recommendation:
          "Wrap state in `remember { mutableStateOf(initialValue) }` or hoist it completely into a ViewModel/StateHolder.",
      });
    }

    // Check 2: Passing raw ViewModel instead of hoisted state
    if (content.includes("viewmodel:") || content.includes("viewmodel =")) {
      findings.push({
        id: "CMP-002",
        category: "Recomposition & Testability",
        severity: "warning",
        title: "Coupling Composable Directly to ViewModel",
        explanation:
          "Passing the ViewModel instance into reusable leaf Composables degrades previewability in Android Studio and prevents isolated UI component unit testing.",
        recommendation:
          "Follow State Hoisting best practices: pass immutable State objects (or primitives) and lambdas for event handling down the tree.",
      });
    } else if (content.includes("onvaluechange") || content.includes("onclick")) {
      strengths.push("Excellent event hoisting with lambda callbacks.");
    }

    // Check 3: Missing @Immutable or @Stable on model classes
    if (
      (content.includes("data class") || content.includes("interface")) &&
      !content.includes("@immutable") &&
      !content.includes("@stable")
    ) {
      findings.push({
        id: "CMP-003",
        category: "Compiler Metrics & Stability",
        severity: "info",
        title: "Missing Stability Annotations (@Immutable / @Stable)",
        explanation:
          "If model classes reside in a non-Compose module or contain collections (like List<T>), the Compose compiler marks them unstable, turning composables into non-skippable targets.",
        recommendation:
          "Use `@Immutable` or wrap collections in Kotlinx Immutable Collections (`PersistentList`) to enable smart skipping.",
      });
    }

    // Check 4: DerivedStateOf omission for frequently changing states
    if (
      (content.includes("scrollstate") || content.includes("lazygridstate") || content.includes("lazyliststate")) &&
      !content.includes("derivedstateof")
    ) {
      findings.push({
        id: "CMP-004",
        category: "Recomposition Hotspot",
        severity: "warning",
        title: "Missing derivedStateOf for Scroll / Rapid State Observation",
        explanation:
          "Reading raw scroll offsets without `derivedStateOf` triggers recomposition on every pixel scrolled (60-120fps), generating heavy jank.",
        recommendation:
          "Wrap calculations derived from high-frequency observable state inside `derivedStateOf { ... }`.",
      });
    }
  }

  // Track 2: Mobile System Design (Offline sync, caching, networking)
  if (input.track === "system-design" || input.track === "custom") {
    // Check 1: Missing offline caching strategy
    if (
      content.includes("retrofit") &&
      !content.includes("room") &&
      !content.includes("cache") &&
      !content.includes("offline")
    ) {
      findings.push({
        id: "SYS-001",
        category: "Offline Resiliency",
        severity: "warning",
        title: "Direct Network Dependency Without Local Single-Source-of-Truth",
        explanation:
          "Staff mobile systems mandate an offline-first architecture where the UI observes the local database (Room) and the network engine writes to the database asynchronously.",
        recommendation:
          "Implement Repository pattern with Room database as the Single Source of Truth (SSOT), exposing `Flow<Data>` to ViewModels.",
      });
    }

    // Check 2: Conflict resolution mentioned
    if (
      content.includes("sync") &&
      !content.includes("conflict") &&
      !content.includes("version") &&
      !content.includes("timestamp") &&
      !content.includes("crdt")
    ) {
      findings.push({
        id: "SYS-002",
        category: "Data Integrity",
        severity: "warning",
        title: "Unspecified Sync Conflict Resolution Strategy",
        explanation:
          "Bi-directional data sync requires a deterministic strategy (Last-Write-Wins with vector clocks, server authority, or CRDTs) to prevent data loss across devices.",
        recommendation:
          "Detail how offline mutations are queued (e.g., WorkManager with backoff) and how timestamp/version conflicts are arbitrated.",
      });
    } else if (content.includes("workmanager") || content.includes("crdt") || content.includes("lww")) {
      strengths.push("Explicit offline synchronization mechanism identified.");
    }
  }

  // Track 3: Coroutines & Concurrency
  if (input.track === "coroutines" || input.track === "custom") {
    // Check 1: GlobalScope usage
    if (content.includes("globalscope.launch") || content.includes("globalscope.async")) {
      findings.push({
        id: "COR-001",
        category: "Structured Concurrency",
        severity: "error",
        title: "Anti-Pattern: GlobalScope Invocation",
        explanation:
          "Using `GlobalScope` breaks structured concurrency, keeps coroutines alive after the Activity/ViewModel is destroyed, and creates severe memory leaks.",
        recommendation:
          "Always launch inside a lifecycle-aware scope such as `viewModelScope`, `lifecycleScope`, or an injected application-level `CoroutineScope` with `SupervisorJob`.",
      });
    }

    // Check 2: Blocking IO on main dispatcher
    if (
      (content.includes("fileinputstream") ||
        content.includes("bufferedreader") ||
        content.includes("thread.sleep")) &&
      !content.includes("dispatchers.io")
    ) {
      findings.push({
        id: "COR-002",
        category: "Thread Safety",
        severity: "error",
        title: "Blocking I/O Without Explicit Dispatchers.IO Switch",
        explanation:
          "Executing blocking file or network calls on `Dispatchers.Main` leads to Application Not Responding (ANR) crashes.",
        recommendation:
          "Wrap blocking operations in `withContext(Dispatchers.IO) { ... }` or use suspendable I/O libraries (Okio, Ktor).",
      });
    }

    // Check 3: StateFlow vs SharedFlow
    if (content.includes("stateflow") || content.includes("sharedflow")) {
      strengths.push("Modern reactive state modeling using Kotlin Flow primitives.");
    }
  }

  // Compute Score & Level
  let baseScore = 95;
  for (const f of findings) {
    if (f.severity === "error") baseScore -= 25;
    else if (f.severity === "warning") baseScore -= 12;
    else baseScore -= 5;
  }
  const score = Math.max(20, Math.min(100, baseScore));

  let level: ArchitectureReviewReport["level"] = "Junior";
  if (score >= 85) level = "Staff / Principal";
  else if (score >= 70) level = "Senior";
  else if (score >= 50) level = "Mid-Level";

  let summary = "";
  let mentorAdvice = "";

  if (level === "Staff / Principal") {
    summary =
      "Clean, scalable architecture demonstrating strong grasp of modern Android patterns, structured concurrency, and decoupled state management.";
    mentorAdvice =
      "Your foundation is exceptional. In our 1:1 session, we can focus on Tier-1 Staff interview system design edge cases: distributed state synchronization, dynamic feature modularization, and custom Compose layout subcomposition.";
  } else if (level === "Senior") {
    summary =
      "Solid architectural foundation with good separation of concerns, but minor recomposition or concurrency traps remain that senior interviewers look for.";
    mentorAdvice =
      "A few high-impact optimizations around stability inference and Single-Source-of-Truth caching will elevate your design to Staff caliber. Let's practice these in a mock design round.";
  } else if (level === "Mid-Level") {
    summary =
      "Functional implementation, but contains architectural coupling and potential runtime performance hotspots (recomposition overhead or thread blocking).";
    mentorAdvice =
      "We should spend our 90-minute session reviewing UDF (Unidirectional Data Flow), lifecycle-aware scoping, and decoupling the UI layer from business state.";
  } else {
    summary =
      "Critical anti-patterns detected (unstructured coroutine lifecycles or unremembered Compose state) that risk memory leaks or UI bugs in production.";
    mentorAdvice =
      "I strongly recommend scheduling a focused 1:1 session to establish clean architectural fundamentals before undertaking senior technical interviews.";
  }

  return {
    score,
    level,
    summary,
    strengths,
    findings,
    mentorAdvice,
  };
}

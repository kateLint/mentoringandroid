export interface ScheduledInterval {
  id: string;
  date: string; // YYYY-MM-DD
  startMinutes: number; // minutes from midnight (e.g. 10:00 AM = 600)
  durationMinutes: number; // e.g. 90
}

export interface SolverResult {
  satisfiable: boolean;
  status: "SAT" | "UNSAT";
  unsatCore?: string; // Reason for conflict
}

/**
 * Z3-inspired SMT constraint solver for formal verification of schedule feasibility.
 * Verifies 4 fundamental temporal invariants:
 *   1. Non-Overlap Invariant: ∀ i, j (i ≠ j) : [start_i, end_i) ∩ [start_j, end_j) = ∅
 *   2. Preparation Buffer Invariant: ∀ i, j (i ≠ j) : end_i + buffer ≤ start_j ∨ end_j + buffer ≤ start_i
 *   3. Daily Capacity Bound: ∀ d : |{i | date(i) = d}| ≤ MAX_SESSIONS_PER_DAY
 *   4. Business Working Hours: ∀ i : start_i ≥ 480 (08:00 AM) ∧ end_i ≤ 1320 (10:00 PM)
 */
export class SchedulingConstraintSolver {
  private bufferMinutes: number;
  private maxDailySessions: number;
  private businessStartMinutes: number;
  private businessEndMinutes: number;

  constructor(options?: {
    bufferMinutes?: number;
    maxDailySessions?: number;
    businessStartMinutes?: number;
    businessEndMinutes?: number;
  }) {
    this.bufferMinutes = options?.bufferMinutes ?? 15;
    this.maxDailySessions = options?.maxDailySessions ?? 3;
    this.businessStartMinutes = options?.businessStartMinutes ?? 480; // 08:00
    this.businessEndMinutes = options?.businessEndMinutes ?? 1320; // 22:00
  }

  public timeStringToMinutes(timeStr: string): number {
    // Expects format "10:00 AM" or "02:30 PM"
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 600; // default fallback 10:00 AM

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  /**
   * Evaluates if adding candidateInterval preserves satisfiability (SAT) of all invariants.
   */
  public checkSatisfiability(
    existing: ScheduledInterval[],
    candidate: ScheduledInterval
  ): SolverResult {
    const candStart = candidate.startMinutes;
    const candEnd = candidate.startMinutes + candidate.durationMinutes;

    // Invariant 4: Business Working Hours
    if (candStart < this.businessStartMinutes || candEnd > this.businessEndMinutes) {
      return {
        satisfiable: false,
        status: "UNSAT",
        unsatCore: `Constraint violation: candidate slot [${candStart}, ${candEnd}] lies outside approved mentor business hours [${this.businessStartMinutes}, ${this.businessEndMinutes}].`,
      };
    }

    // Filter existing sessions on the candidate date
    const sameDaySessions = existing.filter((s) => s.date === candidate.date && s.id !== candidate.id);

    // Invariant 3: Daily Capacity Bound
    if (sameDaySessions.length >= this.maxDailySessions) {
      return {
        satisfiable: false,
        status: "UNSAT",
        unsatCore: `Daily capacity violation: maximum limit of ${this.maxDailySessions} sessions reached for date ${candidate.date}.`,
      };
    }

    // Invariants 1 & 2: Non-Overlap & Buffer Invariant
    for (const session of sameDaySessions) {
      const sessStart = session.startMinutes;
      const sessEnd = session.startMinutes + session.durationMinutes;

      // Overlap check
      const overlaps = candStart < sessEnd && sessStart < candEnd;
      if (overlaps) {
        return {
          satisfiable: false,
          status: "UNSAT",
          unsatCore: `Overlap violation: candidate interval [${candStart}, ${candEnd}] intersects existing booking ${session.id} [${sessStart}, ${sessEnd}].`,
        };
      }

      // Buffer check
      const violatedBuffer =
        (candEnd <= sessStart && candEnd + this.bufferMinutes > sessStart) ||
        (sessEnd <= candStart && sessEnd + this.bufferMinutes > candStart);

      if (violatedBuffer) {
        return {
          satisfiable: false,
          status: "UNSAT",
          unsatCore: `Buffer violation: less than ${this.bufferMinutes} minutes preparation buffer between candidate slot and booking ${session.id}.`,
        };
      }
    }

    return {
      satisfiable: true,
      status: "SAT",
    };
  }
}

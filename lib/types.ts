export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  currency: string;
  currencySymbol: string;
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  active: boolean;
  inclusions: string[];
  cancellationRules: string;
  paymentNote: string;
}

export interface MentorProfile {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  portraitUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  yearsExperience: number;
  menteesHelped: number;
}

export interface CurriculumBlock {
  timeRange: string;
  title: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  companyOrContext: string;
  date?: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TimeSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM", "02:00 PM", "06:00 PM"
  timeZone: string; // e.g. "UTC" or "Asia/Kolkata" or "America/New_York"
  isAvailable: boolean;
}

export interface IntakeData {
  fullName: string;
  email: string;
  timeZone: string;
  primaryGoal: string;
  focusArea: "interview" | "architecture" | "resume_portfolio" | "career_roadmap" | "other";
  portfolioOrResumeUrl?: string;
  currentRoleOrBackground?: string;
  notesOrAccessibility?: string;
  acceptedTerms: boolean;
}

export interface Booking {
  id: string;
  offerId: string;
  customerName: string;
  customerEmail: string;
  timeZone: string;
  primaryGoal: string;
  focusArea: string;
  portfolioOrResumeUrl?: string;
  currentRoleOrBackground?: string;
  notesOrAccessibility?: string;
  slotDate: string;
  slotTime: string;
  slotDurationMinutes: number;
  currency: string;
  amountPaid: number;
  status: "confirmed" | "rescheduled" | "cancelled" | "completed";
  paymentReference: string;
  meetingLink: string;
  createdAt: string;
}

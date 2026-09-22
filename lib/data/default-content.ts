import { Offer, MentorProfile, CurriculumBlock, Testimonial, FaqItem, TimeSlot } from "../types";

export const defaultOffer: Offer = {
  id: "android-1on1-mentoring",
  title: "1:1 Android Engineering & Career Mentorship",
  subtitle: "Make your next career move with a clear plan and direct feedback.",
  durationMinutes: 90,
  currency: "INR",
  currencySymbol: "₹",
  originalPrice: 7999,
  currentPrice: 4999,
  discountPercentage: 38,
  active: true,
  inclusions: [
    "90-minute private 1:1 live video strategy call",
    "Pre-session in-depth questionnaire & code/resume review",
    "Detailed written action plan & roadmap delivered after the call",
    "Tailored Android architecture & learning resource recommendations",
    "14 days of direct email follow-up for your implementation questions",
  ],
  cancellationRules: "Free rescheduling up to 24 hours before session. 100% money-back guarantee if we determine in the first 15 minutes that we are not the right fit.",
  paymentNote: "Secure payment. Instant calendar invitation sent to your email.",
};

export const defaultMentor: MentorProfile = {
  name: "Kate Lint",
  title: "Staff Android Architect & Engineering Lead",
  credentials: [
    "10+ Years Building Scalable Android & Multiplatform Apps",
    "Ex-Lead Architect for High-Scale Production Mobile Apps",
    "Deep Expertise in Jetpack Compose, Kotlin Multiplatform, and System Design",
    "Mentored 150+ Engineers into Senior & Staff Mobile Roles",
  ],
  bio: "I help Android and mobile developers break through career plateaus, master production architecture, and ace tough technical interviews. My mentoring sessions combine brutally honest feedback with a practical roadmap you can put to work immediately.",
  portraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  linkedInUrl: "https://linkedin.com/in/katelint",
  githubUrl: "https://github.com/kateLint",
  yearsExperience: 10,
  menteesHelped: 150,
};

export const defaultCurriculum: CurriculumBlock[] = [
  {
    timeRange: "0 – 20 min",
    title: "Goals, Diagnostics & Current Position",
    description: "Clarify your immediate decision, deadline, technical stack, current level, and friction points.",
    details: [
      "Review your pre-session intake questions and target role expectations",
      "Audit your technical strengths, knowledge gaps, and specific constraints",
      "Establish the high-priority focal point for the remaining 70 minutes",
    ],
  },
  {
    timeRange: "20 – 45 min",
    title: "Deep Review & Direct Technical Feedback",
    description: "Line-by-line review of your code repository, architecture design, resume, or live interview answer approach.",
    details: [
      "Resume & portfolio roast: highlighting what hiring managers look for vs. skip",
      "Architecture audit: clean architecture, MVI/MVVM, reactive flows, and testability",
      "System design dry-run: structuring scalable offline-first Android components",
    ],
  },
  {
    timeRange: "45 – 75 min",
    title: "Strategic Action Plan & 90-Day Roadmap",
    description: "Turn observations into a structured, realistic execution plan with milestones and practice points.",
    details: [
      "Customized roadmap tailored specifically to your target level (Senior / Staff / Lead)",
      "Curated practice scenarios for system design and advanced Kotlin patterns",
      "Strategies for negotiating offers and positioning your experience",
    ],
  },
  {
    timeRange: "75 – 90 min",
    title: "Q&A, Immediate Next Actions & Wrap-Up",
    description: "Resolve remaining open questions and lock in the exact tasks you will execute during week one.",
    details: [
      "Rapid-fire Q&A on any lingering technical or career doubts",
      "Commitment checklist for the first 7 days following the call",
      "Instructions for submitting follow-up questions over the 14-day email support window",
    ],
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "The 90-minute architecture review completely transformed how I approached my Staff Engineer interviews. I secured an offer with a 45% compensation jump within 6 weeks.",
    author: "Arjun M.",
    role: "Senior Android Developer → Staff Engineer",
    companyOrContext: "Top Fintech Unicorn",
    date: "August 2026",
    verified: true,
  },
  {
    id: "t2",
    quote: "Kate did not sugarcoat anything. She pointed out 3 critical flaws in my Jetpack Compose state modeling that had been causing frame drops in my portfolio app. Unmatched clarity.",
    author: "Elena R.",
    role: "Mobile App Engineer",
    companyOrContext: "Global Logistics Tech",
    date: "July 2026",
    verified: true,
  },
  {
    id: "t3",
    quote: "Worth every penny. Having a personalized written roadmap after the session kept me accountable. The 14-day email support helped me refine my design doc before my final round.",
    author: "David K.",
    role: "Android Specialist",
    companyOrContext: "Enterprise SaaS",
    date: "September 2026",
    verified: true,
  },
];

export const defaultFaqs: FaqItem[] = [
  {
    question: "Do I need to prepare before our session?",
    answer: "Yes. Once you book, you will complete a short intake form with your top 1-2 priorities (e.g., resume review, mock architecture interview, or career transition). You can link your GitHub repo or resume so the mentor reviews it beforehand.",
  },
  {
    question: "How is the session time scheduled?",
    answer: "You can select your preferred day and time directly on our booking calendar in your local timezone. As soon as checkout is complete, you receive an instant Google Calendar invitation with a private Google Meet video link.",
  },
  {
    question: "Can I reschedule if an unexpected conflict arises?",
    answer: "Absolutely. You can reschedule your appointment for free up to 24 hours before our scheduled start time using the one-click link inside your confirmation email.",
  },
  {
    question: "Will the session be recorded?",
    answer: "Yes, with your consent! We can record the Google Meet video call so you can rewatch the code reviews and architecture diagrams anytime. You also receive a written summary doc after the call.",
  },
  {
    question: "What if my focus area is outside the mentor's expertise?",
    answer: "If you are unsure whether your specific Android stack or career situation is a good fit, feel free to email support@mentoringandroid.dev before booking. If we determine in the first 15 minutes that we cannot help you, we issue a prompt 100% refund.",
  },
];

// Generate next 14 days sample time slots
export function generateDefaultSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const times = ["10:00 AM", "02:00 PM", "05:30 PM", "08:00 PM"];
  const now = new Date();

  for (let i = 1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    // skip Sundays
    if (d.getDay() === 0) continue;

    const dateStr = d.toISOString().split("T")[0];
    times.forEach((time, index) => {
      // make some slots booked for realistic availability
      const isAvailable = (i + index) % 3 !== 0;
      slots.push({
        id: `slot-${dateStr}-${index}`,
        date: dateStr,
        time,
        timeZone: "UTC",
        isAvailable,
      });
    });
  }

  return slots;
}

export interface NewsletterPlan {
  week: number;
  sendDate: string;
  theme: string;
  focusVertical: string;
  exclusiveTipTopics: string[];
  specialHook?: string;
  status: "sent" | "scheduled" | "planned";
}

export const NEWSLETTER_THEMES = [
  "Speed to Lead",
  "Follow-Up Mastery",
  "CRM Power User",
  "Lead Quality",
  "Scripts That Convert",
  "Multi-Channel Outreach",
  "Industry Deep Dive",
  "Pipeline Management",
  "Cost Optimization",
  "The Conversion Mindset",
] as const;

export const NEWSLETTER_CALENDAR: NewsletterPlan[] = [
  {
    week: 1,
    sendDate: "2026-03-17",
    theme: "Speed to Lead",
    focusVertical: "General",
    exclusiveTipTopics: [
      "The 3-device alert system that ensures you never miss a lead",
      "What to say in the first 10 seconds of a lead call (exact script)",
      "The auto-text message that buys you 15 minutes to call back",
    ],
    specialHook: "Launch issue — welcome readers and establish the newsletter's value proposition",
    status: "planned",
  },
  {
    week: 2,
    sendDate: "2026-03-24",
    theme: "Follow-Up Mastery",
    focusVertical: "Insurance",
    exclusiveTipTopics: [
      "The 21-touch follow-up rule: why 80% of sales happen after the 5th contact",
      "Insurance-specific voicemail script with a 23% callback rate",
      "How to use policy expiration dates as follow-up triggers",
    ],
    status: "planned",
  },
  {
    week: 3,
    sendDate: "2026-03-31",
    theme: "CRM Power User",
    focusVertical: "General",
    exclusiveTipTopics: [
      "The 5-minute CRM audit: fields that predict conversion",
      "One automation that saves 45 minutes per day on lead management",
      "Custom views that show you exactly who to call next",
    ],
    status: "planned",
  },
  {
    week: 4,
    sendDate: "2026-04-07",
    theme: "Lead Quality",
    focusVertical: "Mortgage",
    exclusiveTipTopics: [
      "The 30-second lead quality assessment (before you even dial)",
      "Mortgage lead quality signals: what the form data tells you",
      "How to negotiate lead returns with your vendor (template email included)",
    ],
    status: "planned",
  },
  {
    week: 5,
    sendDate: "2026-04-14",
    theme: "Scripts That Convert",
    focusVertical: "Solar",
    exclusiveTipTopics: [
      "The 'savings comparison' opener that works for solar leads",
      "How to handle 'I'm just getting quotes' without losing the lead",
      "The voicemail-to-text combo that doubles your contact rate",
    ],
    status: "planned",
  },
  {
    week: 6,
    sendDate: "2026-04-21",
    theme: "Multi-Channel Outreach",
    focusVertical: "General",
    exclusiveTipTopics: [
      "The exact 7-day multi-channel sequence I use for new leads",
      "Text message templates that get replies (not opt-outs)",
      "LinkedIn connection request template for B2B internet leads",
    ],
    status: "planned",
  },
  {
    week: 7,
    sendDate: "2026-04-28",
    theme: "Industry Deep Dive",
    focusVertical: "Home Improvement",
    exclusiveTipTopics: [
      "Storm damage lead timing: how to be first after severe weather",
      "The in-home estimate framework that closes at 40%+",
      "Financing presentation script that removes the price objection",
    ],
    status: "planned",
  },
  {
    week: 8,
    sendDate: "2026-05-05",
    theme: "Pipeline Management",
    focusVertical: "General",
    exclusiveTipTopics: [
      "The morning pipeline review that takes 8 minutes and sets up your whole day",
      "Lead aging alerts: the CRM rule that prevents leads from going cold",
      "How to calculate your maximum lead capacity (formula included)",
    ],
    status: "planned",
  },
  {
    week: 9,
    sendDate: "2026-05-12",
    theme: "Cost Optimization",
    focusVertical: "Insurance",
    exclusiveTipTopics: [
      "The lead cost spreadsheet that shows your true cost per acquisition",
      "When to buy aged leads vs fresh leads (the break-even analysis)",
      "Negotiation email template that got me 20% off my lead costs",
    ],
    status: "planned",
  },
  {
    week: 10,
    sendDate: "2026-05-19",
    theme: "The Conversion Mindset",
    focusVertical: "General",
    exclusiveTipTopics: [
      "Why treating internet leads like referrals destroys your conversion rate",
      "The daily activity targets that separate top earners from the pack",
      "Mental framework: how to stay motivated when contact rates are low",
    ],
    status: "planned",
  },
  {
    week: 11,
    sendDate: "2026-05-26",
    theme: "Speed to Lead",
    focusVertical: "Mortgage",
    exclusiveTipTopics: [
      "Rate alert + speed to lead: the mortgage LO's secret weapon",
      "Pre-qualification by phone: the 4-question script that saves hours",
      "How to compete against online lenders with better lead response",
    ],
    specialHook: "Tie into summer home buying season ramp-up",
    status: "planned",
  },
  {
    week: 12,
    sendDate: "2026-06-02",
    theme: "Scripts That Convert",
    focusVertical: "General",
    exclusiveTipTopics: [
      "The 'I didn't fill that out' response script (with 3 variants)",
      "Appointment-setting close that works across all verticals",
      "End-of-call summary technique that reduces no-shows by 35%",
    ],
    specialHook: "Mid-year check-in — help readers assess their H1 performance",
    status: "planned",
  },
];

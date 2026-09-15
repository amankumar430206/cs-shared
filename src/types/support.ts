// Types mirroring cs-api's modules/support responses.

// Mirrors cs-api's support.validators.js TICKET_CATEGORIES.
export const TICKET_CATEGORIES = [
  { value: "ACCOUNT_ISSUES", label: "Account Issues" },
  { value: "LOGIN_PROBLEMS", label: "Login Problems" },
  { value: "KYC_VERIFICATION", label: "KYC Verification" },
  { value: "CAMPAIGN_ISSUES", label: "Campaign Issues" },
  { value: "BOOKING_ISSUES", label: "Booking Issues" },
  { value: "PAYMENT_ISSUES", label: "Payment Issues" },
  { value: "REFUND_REQUESTS", label: "Refund Requests" },
  { value: "PAYOUT_ISSUES", label: "Payout Issues" },
  { value: "DEVICE_ISSUES", label: "Device Issues" },
  { value: "SCREEN_OFFLINE", label: "Screen Offline" },
  { value: "ANDROID_PLAYER_ISSUES", label: "Android Player Issues" },
  { value: "CLOUD_CMS_ISSUES", label: "Cloud CMS Issues" },
  { value: "TECHNICAL_SUPPORT", label: "Technical Support" },
  { value: "GENERAL_INQUIRY", label: "General Inquiry" },
  { value: "FEATURE_REQUEST", label: "Feature Request" },
  { value: "BUG_REPORT", label: "Bug Report" },
  { value: "OTHER", label: "Other" },
] as const;
export type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"];

export const TICKET_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export const TICKET_STATUSES = [
  "OPEN",
  "ASSIGNED",
  "UNDER_REVIEW",
  "WAITING_FOR_CUSTOMER",
  "IN_PROGRESS",
  "ESCALATED",
  "RESOLVED",
  "CLOSED",
  "REOPENED",
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const ASSIGNMENT_TEAMS = ["SUPPORT", "FINANCE", "TECHNICAL", "OPERATIONS", "ENGINEERING", "MANAGEMENT"] as const;
export type AssignmentTeam = (typeof ASSIGNMENT_TEAMS)[number];

// Statuses a ticket is "closed out" in — mirrors support.service.js's
// TERMINAL_STATUSES. Only from here can it be reopened, and only from here
// can feedback be left.
export const TERMINAL_TICKET_STATUSES: TicketStatus[] = ["RESOLVED", "CLOSED"];

export interface Ticket {
  id: string;
  userId: string;
  /** Only present on the admin queue's rows (joined in server-side). */
  raiserName?: string;
  raiserMobile?: string;
  raiserRole?: string;
  category: TicketCategory;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string | null;
  assignedTeam: AssignmentTeam | null;
  resolutionSummary: string | null;
  resolvedAt: string | null;
  resolvedBy: string | null;
  feedbackRating: number | null;
  feedbackComment: string | null;
  firstRespondedAt: string | null;
  /** Only present when the caller has support:manage (see toTicketDto). */
  sla: { firstResponseBreached: boolean; resolutionBreached: boolean; breached: boolean } | null;
  createdAt: string;
  updatedAt: string;
}

export interface SlaConfig {
  priority: TicketPriority;
  firstResponseMinutes: number;
  resolutionMinutes: number;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  /** Never present on a message returned to the ticket's own owner. */
  isInternalNote: boolean;
  createdAt: string;
}

export interface TicketDetail {
  ticket: Ticket;
  messages: TicketMessage[];
}

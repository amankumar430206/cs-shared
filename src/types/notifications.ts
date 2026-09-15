// Types mirroring cs-api's modules/notifications responses.

export type NotificationCategory =
  | "AUTH"
  | "KYC"
  | "SCREENS"
  | "CAMPAIGNS"
  | "BOOKINGS"
  | "PAYMENTS"
  | "PAYOUTS"
  | "DEVICE_HEALTH"
  | "MAINTENANCE"
  | "SUPPORT"
  | "SYSTEM"
  | "SECURITY";

export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
export type NotificationStatus = "SENT" | "READ";

// Mirrors cs-api's notification_preferences table. There's deliberately no
// `security` toggle — security notifications can't be disabled
// (docs/13-notifications-support.md), enforced server-side in
// notifications.service.js's createNotification.
export interface NotificationPreferences {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  marketingEnabled: boolean;
  /** Null when the user has never saved a preference (all-enabled defaults). */
  updatedAt: string | null;
}

export interface Notification {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  link: string | null;
  status: NotificationStatus;
  readAt: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// Admin-editable — see notifications.service.js's createNotification. Every
// real notification trigger has one of these rows now (see the seed
// migrations). emailEnabled is a separate per-trigger kill switch for email
// delivery specifically — distinct from a user's own email preference — and
// is always true for SECURITY-category triggers regardless of what's saved
// here (the backend hard-exempts that category, matching "security
// notifications can't be disabled").
export interface NotificationTemplate {
  templateKey: string;
  category: NotificationCategory;
  titleTemplate: string;
  messageTemplate: string;
  emailEnabled: boolean;
  updatedAt: string;
}

import { z } from "zod";
import { PASSWORD_PATTERN } from "./onboarding";

// Mirrors cs-api's auth.validators.js loginSchema — identifier accepts
// either an email or a mobile number (email became optional at registration
// for Screen Partners, so login can't be email-only anymore).
export const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number"),
  password: z.string().min(1, "Enter your password"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const verifyOtpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

// Mirrors cs-api's auth.validators.js forgotPasswordSchema — same
// email-or-mobile `identifier` as login, since that's all a locked-out user
// knows about their own account.
export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number"),
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Mirrors auth.validators.js resetPasswordSchema. `confirmPassword` is
// frontend-only (the API takes just `newPassword`) — a mistyped new password
// on a reset flow is unrecoverable without requesting another code, so it's
// worth catching here.
export const resetPasswordSchema = z
  .object({
    code: z.string().length(6, "Enter the 6-digit code"),
    newPassword: z
      .string()
      .regex(
        PASSWORD_PATTERN,
        "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

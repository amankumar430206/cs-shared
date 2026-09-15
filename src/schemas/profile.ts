import { z } from "zod";
import { PASSWORD_PATTERN } from "./onboarding";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(120),
});
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().regex(
      PASSWORD_PATTERN,
      "Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character"
    ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// Mirrors cs-api's kyc.validators.js updateBankDetailsSchema.
export const bankDetailsSchema = z.object({
  bankAccountNumber: z.string().min(6).max(30),
  bankIfsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
  bankAccountName: z.string().min(2).max(120),
  upiId: z.string().max(80).optional().or(z.literal("")),
});
export type BankDetailsFormValues = z.infer<typeof bankDetailsSchema>;

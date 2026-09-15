import { z } from "zod";
import { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS } from "../types/campaigns";

// Mirrors cs-api's campaigns.validators.js createCampaignSchema. Budget is
// z.coerce since the underlying <Input> is a text input.
export const campaignFormSchema = z.object({
  name: z.string().min(2, "Enter a campaign name").max(160),
  objective: z.string().min(1, "Select an objective"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Pick a start date"),
  endDate: z.string().min(1, "Pick an end date"),
  totalBudget: z.coerce.number().positive("Enter a valid total budget"),
  targetAudienceSegments: z.array(z.string()).optional(),
  // Only meaningful alongside "OTHER" in targetAudienceSegments.
  targetAudienceOther: z.string().max(160).optional(),
  targetAgeMin: z.number().int().optional(),
  targetAgeMax: z.number().int().optional(),
  // Custom messages here, not Zod's own default ("Too big: expected array
  // to have <=10 items") — matches cs-api's campaigns.validators.js wording
  // for the same fields, so client and server agree if this is ever hit
  // both ways (e.g. a stale client bypassing this schema).
  preferredCities: z.array(z.string()).max(10, "You can select up to 10 cities.").optional(),
  preferredScreenTypes: z.array(z.string()).max(10, "You can select up to 10 screen types.").optional(),
  adDuration: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().min(AD_DURATION_MIN_SECONDS).max(AD_DURATION_MAX_SECONDS).optional()),
  frequency: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().positive().optional()),
})
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after the start date.",
    path: ["endDate"],
  })
  .refine((data) => data.targetAgeMin == null || data.targetAgeMax == null || data.targetAgeMax >= data.targetAgeMin, {
    message: "Age range end must be on or after the start.",
    path: ["targetAgeMax"],
  });

export type CampaignFormInput = z.input<typeof campaignFormSchema>;
export type CampaignFormOutput = z.output<typeof campaignFormSchema>;

export { AD_DURATION_MAX_SECONDS, AD_DURATION_MIN_SECONDS };

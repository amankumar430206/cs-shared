// Copied from cs-web src/schemas/builder.ts — keep in sync.
import { z } from "zod";
import { PRIMARY_OBJECTIVES } from "../types/campaigns";

// Campaign builder step 1 — mirrors cs-api's createCampaignSchema for the
// fields this step owns (name 2..160, brandName <=150, description <=1000).
// Messages are i18n keys under builder.details.errors, resolved at render.
export const builderDetailsSchema = z.object({
  name: z.string().trim().min(2, "nameRequired").max(160, "nameTooLong"),
  brandName: z.string().trim().max(150, "brandTooLong"),
  objective: z.enum(PRIMARY_OBJECTIVES, { error: "objectiveRequired" }),
  description: z.string().trim().max(1000, "descriptionTooLong"),
});

export type BuilderDetailsInput = z.input<typeof builderDetailsSchema>;
export type BuilderDetailsOutput = z.output<typeof builderDetailsSchema>;

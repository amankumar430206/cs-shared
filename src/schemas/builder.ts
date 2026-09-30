// Copied from cs-web src/schemas/builder.ts — keep in sync.
import { z } from "zod";
import { PRIMARY_OBJECTIVES, TARGET_AUDIENCE_SEGMENTS } from "../types/campaigns";

// Mirrors cs-api's campaigns.validators.js MAX_PREFERRED_CITIES / MAX_PREFERRED_SCREEN_TYPES.
export const MAX_PREFERRED_CITIES = 10;
export const MAX_PREFERRED_SCREEN_TYPES = 10;

const TARGET_AUDIENCE_SEGMENT_VALUES = TARGET_AUDIENCE_SEGMENTS.map((s) => s.value);

// Campaign builder step 1 — mirrors cs-api's createCampaignSchema for the
// fields this step owns: name 2..160, brandName <=150, description <=1000,
// plus the planning fields (target audience, preferred cities/screen types,
// budget). Messages are i18n keys under builder.details.errors, resolved at render.
export const builderDetailsSchema = z.object({
  name: z.string().trim().min(2, "nameRequired").max(160, "nameTooLong"),
  brandName: z.string().trim().max(150, "brandTooLong"),
  objective: z.enum(PRIMARY_OBJECTIVES, { error: "objectiveRequired" }),
  description: z.string().trim().max(1000, "descriptionTooLong"),
  targetAudienceSegments: z.array(z.enum(TARGET_AUDIENCE_SEGMENT_VALUES)).max(TARGET_AUDIENCE_SEGMENTS.length).default([]),
  targetAudienceOther: z.string().trim().max(160, "targetAudienceOtherTooLong").default(""),
  preferredCities: z.array(z.string().trim().max(100)).max(MAX_PREFERRED_CITIES, "preferredCitiesTooMany").default([]),
  preferredScreenTypes: z.array(z.string()).max(MAX_PREFERRED_SCREEN_TYPES, "preferredScreenTypesTooMany").default([]),
  totalBudget: z.number().positive("totalBudgetInvalid").optional(),
});

export type BuilderDetailsInput = z.input<typeof builderDetailsSchema>;
export type BuilderDetailsOutput = z.output<typeof builderDetailsSchema>;

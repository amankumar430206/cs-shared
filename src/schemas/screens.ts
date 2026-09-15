import { z } from "zod";
import { INSTALLATION_ENVIRONMENTS, INTERNET_TYPES } from "../types/screens";

const timeOfDay = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a time as HH:MM (24-hour)");

// Blank optional-number inputs come through as "" from a native <input>;
// transform to undefined instead of letting z.coerce.number() turn "" into 0.
const optionalInt = z
  .string()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .pipe(z.number().int().min(0).optional());

// Same blank-to-undefined pattern as optionalInt, floored at 1 instead of
// 0 — a screen can't have zero ad capacity. Blank means "use the server
// default" (1, exclusive), not "zero."
const optionalCapacity = z
  .string()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .pipe(z.number().int().min(1).max(100).optional());

// Mirrors cs-api's screens.validators.js registerScreenSchema. Required
// numeric fields are z.coerce since the underlying <Input>s are text inputs.
export const screenFormSchema = z.object({
  screenName: z.string().min(2, "Enter a screen name").max(160),
  categoryCode: z.string().min(1, "Select a category"),
  screenSize: z.string().min(1, "Enter a screen size").max(40),
  resolution: z.string().min(1, "Enter a resolution").max(40),
  os: z.string().min(1, "Enter the OS").max(60),
  // Not collected at registration — the physical device reports this once
  // activated (see LinkDeviceDialog / docs/DEVICE_PLAYER_API.md section 3a),
  // not typed in by the partner.
  androidVersion: z.string().optional(),
  deviceSerialNumber: z.string().min(4, "Enter the device serial number").max(120),
  installationAddress: z.string().min(5, "Enter the installation address").max(500),
  city: z.string().min(2, "Enter the city").max(100),
  state: z.string().min(2, "Enter the state").max(100),
  gpsLatitude: z.coerce.number().min(-90, "Enter a valid latitude").max(90, "Enter a valid latitude"),
  gpsLongitude: z.coerce.number().min(-180, "Enter a valid longitude").max(180, "Enter a valid longitude"),
  // A pasted Google Maps (or similar) share link — optional, blank means
  // "not provided" same as ownershipDetails/androidVersion below.
  locationUrl: z.union([z.literal(""), z.string().url("Enter a valid URL")]).optional(),
  internetType: z.enum(INTERNET_TYPES.map((t) => t.value) as [string, ...string[]]),
  operatingHoursStart: timeOfDay,
  operatingHoursEnd: timeOfDay,
  ownershipDetails: z.string().optional(),
  revenueModel: z.string().min(1, "Select a revenue model"),
  pricePerDay: z.coerce.number().positive("Enter a valid listed price per day"),
  estimatedDailyImpressions: optionalInt,
  installationEnvironment: z.enum(INSTALLATION_ENVIRONMENTS.map((e) => e.value) as [string, ...string[]]),
  dailyFootfall: optionalInt,
  deviceModel: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  // How many concurrent campaigns this screen's ad rotation can hold for
  // the same date — see cs-api's 20260101000073 migration. Blank uses the
  // server default (1, exclusive).
  maxAdCapacity: optionalCapacity,
})
  // Only the HH:MM pattern was checked before — nothing compared the two,
  // so "22:00"-"08:00" saved fine and rendered to advertisers as what reads
  // like a data error. Zero-padded HH:MM strings compare correctly with a
  // plain `<`. Mirrors cs-api's requireOperatingHoursOrder.
  .refine((data) => data.operatingHoursStart < data.operatingHoursEnd, {
    message: "End time must be after start time",
    path: ["operatingHoursEnd"],
  });

// RHF is typed with the pre-coercion input shape (native inputs always
// produce strings) and the resolver's post-coercion output shape (numbers)
// via the 3-generic useForm<TInput, TContext, TOutput> pattern.
export type ScreenFormInput = z.input<typeof screenFormSchema>;
export type ScreenFormOutput = z.output<typeof screenFormSchema>;

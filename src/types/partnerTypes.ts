// Copied from cs-web src/lib/partnerTypes.ts — keep in sync with PARTNER_TYPE_VALUES in
// cs-api/src/modules/auth/auth.validators.js.
// A partner can hold several of these at once; "OTHER" additionally takes a short free-text description.
export const PARTNER_TYPES = [
  { value: "EXISTING_SCREEN_OWNER", label: "Existing Screen Owner" },
  { value: "AUTO_RICKSHAW_DRIVER", label: "Auto Rickshaw Driver" },
  { value: "CAB_DRIVER", label: "Cab Driver" },
  { value: "SHOP_OWNER", label: "Shop Owner" },
  { value: "CAFE_OWNER", label: "Cafe Owner" },
  { value: "RESTAURANT_OWNER", label: "Restaurant Owner" },
  { value: "HOTEL_OWNER", label: "Hotel Owner" },
  { value: "HOSPITAL", label: "Hospital" },
  { value: "PETROL_PUMP", label: "Petrol Pump" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "OFFICE_BUILDING", label: "Office Building" },
  { value: "MALL", label: "Mall" },
  { value: "EDUCATIONAL_INSTITUTION", label: "Educational Institution" },
  { value: "FLEET_OPERATOR", label: "Fleet Operator" },
  { value: "OTHER", label: "Other" },
] as const;

export const PARTNER_TYPE_OTHER = "OTHER";
export const PARTNER_TYPE_OTHER_MAX = 120;

// INVESTOR can no longer be picked but existing partners may still carry it.
const LEGACY_LABELS: Record<string, string> = { INVESTOR: "Investor" };

export const partnerTypeLabel = (value: string): string =>
  PARTNER_TYPES.find((p) => p.value === value)?.label ?? LEGACY_LABELS[value] ?? value;

interface PartnerTypeSource {
  partner_type?: string | null;
  partner_types?: string[] | null;
  partner_type_other?: string | null;
  partnerType?: string | null;
  partnerTypes?: string[] | null;
  partnerTypeOther?: string | null;
}

/** Every type a partner holds, falling back to the single legacy field. */
export function partnerTypeValues(src: PartnerTypeSource): string[] {
  const list = src.partner_types ?? src.partnerTypes;
  if (list?.length) return list;
  const single = src.partner_type ?? src.partnerType;
  return single ? [single] : [];
}

/** Human-readable, comma-joined (e.g. "Shop Owner, Other: Salon chain"). */
export function formatPartnerTypes(src: PartnerTypeSource): string {
  const other = (src.partner_type_other ?? src.partnerTypeOther ?? "").trim();
  return partnerTypeValues(src)
    .map((v) => (v === PARTNER_TYPE_OTHER && other ? `${partnerTypeLabel(v)}: ${other}` : partnerTypeLabel(v)))
    .join(", ");
}

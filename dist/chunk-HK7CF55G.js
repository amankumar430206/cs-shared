// src/types/partnerTypes.ts
var PARTNER_TYPES = [
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
  { value: "OTHER", label: "Other" }
];
var PARTNER_TYPE_OTHER = "OTHER";
var PARTNER_TYPE_OTHER_MAX = 120;
var LEGACY_LABELS = { INVESTOR: "Investor" };
var partnerTypeLabel = (value) => PARTNER_TYPES.find((p) => p.value === value)?.label ?? LEGACY_LABELS[value] ?? value;
function partnerTypeValues(src) {
  const list = src.partner_types ?? src.partnerTypes;
  if (list?.length) return list;
  const single = src.partner_type ?? src.partnerType;
  return single ? [single] : [];
}
function formatPartnerTypes(src) {
  const other = (src.partner_type_other ?? src.partnerTypeOther ?? "").trim();
  return partnerTypeValues(src).map((v) => v === PARTNER_TYPE_OTHER && other ? `${partnerTypeLabel(v)}: ${other}` : partnerTypeLabel(v)).join(", ");
}

export { PARTNER_TYPES, PARTNER_TYPE_OTHER, PARTNER_TYPE_OTHER_MAX, formatPartnerTypes, partnerTypeLabel, partnerTypeValues };

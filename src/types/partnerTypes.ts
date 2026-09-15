// Mirrors the partnerType enum in cs-api/src/modules/auth/auth.validators.js
// — keep in sync if that list changes.
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
  { value: "INVESTOR", label: "Investor" },
] as const;

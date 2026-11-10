// Copied from cs-web src/lib/indianIds.ts (mirrors cs-api src/shared/utils/indianIds.js) — keep the three in step.
// They catch typos and obvious inconsistencies; they cannot prove a number was ever issued.

const D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
const P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// Aadhaar: 12 digits, first digit 2-9, last digit is a Verhoeff check digit.
const AADHAAR_SHAPE = /^[2-9][0-9]{11}$/;
export function isValidAadhaar(value: string): boolean {
  if (!AADHAAR_SHAPE.test(value)) return false;
  let c = 0;
  [...value].reverse().forEach((ch, i) => {
    c = D[c][P[i % 8][Number(ch)]];
  });
  return c === 0;
}

// PAN: AAAAA9999A, and the 4th letter is the holder type.
export const PAN_HOLDER_TYPES: Record<string, string> = {
  P: "Individual",
  C: "Company",
  H: "Hindu Undivided Family",
  F: "Firm / LLP",
  A: "Association of Persons",
  T: "Trust",
  B: "Body of Individuals",
  L: "Local authority",
  J: "Artificial juridical person",
  G: "Government",
};
const PAN_SHAPE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const isValidPan = (value: string): boolean => PAN_SHAPE.test(value) && value[3] in PAN_HOLDER_TYPES;

const PAN_TYPES_BY_STRUCTURE: Record<string, string[]> = {
  INDIVIDUAL: ["P"],
  PROPRIETOR: ["P"],
  COMPANY: ["C", "F", "A", "B", "G", "J", "L", "T"],
};

/** true / false, or null when there is nothing to judge (no PAN, bad PAN, no structure). */
export function panFitsLegalStructure(pan: string, structure: string | undefined): boolean | null {
  const allowed = structure ? PAN_TYPES_BY_STRUCTURE[structure] : undefined;
  if (!allowed || !isValidPan(pan)) return null;
  return allowed.includes(pan[3]);
}

/** A registered company (it has a CIN) cannot hold a personal or HUF PAN. */
export const isCompanyPan = (pan: string): boolean => isValidPan(pan) && pan[3] !== "P" && pan[3] !== "H";

// GSTIN: 2-digit state code + PAN + entity no. + 'Z' + check character.
const GSTIN_SHAPE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const GSTIN_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function gstinCheckChar(first14: string): string {
  let sum = 0;
  [...first14].forEach((ch, i) => {
    const product = GSTIN_CHARS.indexOf(ch) * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  });
  return GSTIN_CHARS[(36 - (sum % 36)) % 36];
}

export const isValidGstin = (value: string): boolean => GSTIN_SHAPE.test(value) && value[14] === gstinCheckChar(value.slice(0, 14));
export const gstinPan = (gstin: string): string => gstin.slice(2, 12);

const GST_STATES: Record<string, string[]> = {
  "01": ["Jammu and Kashmir", "J&K"],
  "02": ["Himachal Pradesh"],
  "03": ["Punjab"],
  "04": ["Chandigarh"],
  "05": ["Uttarakhand", "Uttaranchal"],
  "06": ["Haryana"],
  "07": ["Delhi", "NCT of Delhi", "New Delhi"],
  "08": ["Rajasthan"],
  "09": ["Uttar Pradesh", "UP"],
  "10": ["Bihar"],
  "11": ["Sikkim"],
  "12": ["Arunachal Pradesh"],
  "13": ["Nagaland"],
  "14": ["Manipur"],
  "15": ["Mizoram"],
  "16": ["Tripura"],
  "17": ["Meghalaya"],
  "18": ["Assam"],
  "19": ["West Bengal"],
  "20": ["Jharkhand"],
  "21": ["Odisha", "Orissa"],
  "22": ["Chhattisgarh"],
  "23": ["Madhya Pradesh", "MP"],
  "24": ["Gujarat"],
  "25": ["Daman and Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "26": ["Dadra and Nagar Haveli", "Daman and Diu", "Dadra and Nagar Haveli and Daman and Diu"],
  "27": ["Maharashtra"],
  "28": ["Andhra Pradesh"],
  "29": ["Karnataka"],
  "30": ["Goa"],
  "31": ["Lakshadweep"],
  "32": ["Kerala"],
  "33": ["Tamil Nadu"],
  "34": ["Puducherry", "Pondicherry"],
  "35": ["Andaman and Nicobar Islands", "Andaman and Nicobar"],
  "36": ["Telangana"],
  "37": ["Andhra Pradesh"],
  "38": ["Ladakh"],
};

const stateKey = (name: string | undefined) =>
  String(name ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z]/g, "");

const CODES_BY_STATE = new Map<string, string[]>();
Object.entries(GST_STATES).forEach(([code, names]) => {
  names.forEach((name) => {
    const key = stateKey(name);
    CODES_BY_STATE.set(key, [...(CODES_BY_STATE.get(key) ?? []), code]);
  });
});

/** Does the GSTIN's state code agree with this state name? null when the name is not recognised. */
export function gstinMatchesState(gstin: string, stateName: string | undefined): boolean | null {
  const codes = CODES_BY_STATE.get(stateKey(stateName));
  if (!codes || !GSTIN_SHAPE.test(gstin)) return null;
  return codes.includes(gstin.slice(0, 2));
}

/** The first state name for a GSTIN's state code, for "registered in X" messages. */
export function gstinStateName(gstin: string): string | undefined {
  return GST_STATES[gstin.slice(0, 2)]?.[0];
}

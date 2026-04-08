import { isFloat, isNumeric } from "@app/library/base/appUtils";
import { Decimal } from "@app/library/base/Decimal";

const MAX_AMOUNT = Decimal.from(String(Number.MAX_SAFE_INTEGER));

/** Strip grouping commas before validation / storage (canonical string has no commas). */
export function normalizeAmountInput(value: string): string {
  return value.replace(/,/g, "");
}

/**
 * Canonical amount (digits + optional one `.` + decimals) → display with thousands separators.
 */
export function formatAmountInputDisplay(canonical: string): string {
  if (canonical === "" || canonical === undefined) return "";
  const s = normalizeAmountInput(canonical);
  if (s === ".") return ".";
  const neg = s.startsWith("-");
  let rest = neg ? s.slice(1) : s;
  const hasDot = rest.includes(".");
  const [intPart, ...fracParts] = rest.split(".");
  const fracPart = hasDot ? fracParts.join(".") : "";

  const intGrouped =
    intPart === "" ? "" : intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let out = (neg ? "-" : "") + intGrouped;
  if (hasDot) {
    out += "." + fracPart;
  }
  return out;
}

export function isAmountValid(value: string) {
  const v = normalizeAmountInput(value);
  if (v === "") return true;
  if (v === ".") return true;

  const dotRegexp = /\./g;
  const splits = v.split(".");

  if (v[0] === "0" && v.length > 1 && v[1] !== ".") {
    return false;
  }

  if ((v.match(dotRegexp) || []).length > 1) {
    return false;
  }

  if (!((!!v && (isNumeric(v) || isFloat(v))) || !v)) {
    return false;
  }

  if (dotRegexp.test(v) && splits[1] && splits[1].length > 2) {
    return false;
  }

  const forMax =
    v.endsWith(".") && v.split(".").length === 2 ? v.slice(0, -1) : v;
  if (forMax === "" || forMax === "-") return true;

  try {
    if (Decimal.from(forMax).gt(MAX_AMOUNT)) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

export function amountHandler(value: string, handler: (canonical: string) => void) {
  !!isAmountValid(value) && handler(normalizeAmountInput(value));
}

export const keyPressAmountHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9\b.]/.test(e.key)) {
    e.preventDefault();
  }
};

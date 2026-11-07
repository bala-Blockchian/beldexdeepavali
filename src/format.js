export const ATOMIC_UNITS = 1e9;

export function atomicToBdx(atomic) {
  return Number(atomic) / ATOMIC_UNITS;
}

export function formatBdx(value, digits = 2) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatInt(value) {
  return Number(value || 0).toLocaleString("en-US");
}

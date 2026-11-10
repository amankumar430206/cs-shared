// Copied from cs-web src/lib/identityMatch.ts (mirrors cs-api src/shared/utils/identityMatch.js) — keep the three in step.
// The verdict is advice for the person: MATCH, REVIEW (looks related) or MISMATCH, never a block.

export type NameMatchStatus = "MATCH" | "REVIEW" | "MISMATCH" | "UNKNOWN";

const HONORIFICS = new Set(["mr", "mrs", "ms", "miss", "shri", "shree", "sri", "smt", "kumari", "dr", "prof", "late"]);
const FILLER = new Set(["and", "the", "pvt", "private", "ltd", "limited", "llp", "co", "company", "ms"]);

function nameTokens(name: string | undefined | null): string[] {
  return String(name ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !HONORIFICS.has(t) && !FILLER.has(t));
}

function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const range = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
  const aMatched = new Array<boolean>(a.length).fill(false);
  const bMatched = new Array<boolean>(b.length).fill(false);
  let matches = 0;
  for (let i = 0; i < a.length; i += 1) {
    const from = Math.max(0, i - range);
    const to = Math.min(i + range + 1, b.length);
    for (let j = from; j < to; j += 1) {
      if (!bMatched[j] && a[i] === b[j]) {
        aMatched[i] = true;
        bMatched[j] = true;
        matches += 1;
        break;
      }
    }
  }
  if (!matches) return 0;
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (aMatched[i]) {
      while (!bMatched[k]) k += 1;
      if (a[i] !== b[k]) transpositions += 1;
      k += 1;
    }
  }
  const jaro = (matches / a.length + matches / b.length + (matches - transpositions / 2) / matches) / 3;
  let prefix = 0;
  while (prefix < 4 && a[prefix] === b[prefix]) prefix += 1;
  return jaro + prefix * 0.1 * (1 - jaro);
}

// A lone initial ("R") stands for any name that starts with it.
const tokenScore = (a: string, b: string) => (a.length === 1 || b.length === 1 ? (a[0] === b[0] ? 0.9 : 0) : jaroWinkler(a, b));

export function compareNames(first: string | undefined | null, second: string | undefined | null): { status: NameMatchStatus; score: number } {
  const a = nameTokens(first);
  const b = nameTokens(second);
  if (!a.length || !b.length) return { status: "UNKNOWN", score: 0 };

  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  const used = new Set<number>();
  let sum = 0;
  let weakest = 1;
  short.forEach((token) => {
    let best = 0;
    let bestIndex = -1;
    long.forEach((other, i) => {
      if (used.has(i)) return;
      const s = tokenScore(token, other);
      if (s > best) {
        best = s;
        bestIndex = i;
      }
    });
    if (bestIndex >= 0) used.add(bestIndex);
    sum += best;
    weakest = Math.min(weakest, best);
  });

  const score = Math.round((sum / short.length) * 100) / 100;
  let status: NameMatchStatus = "MISMATCH";
  if (score >= 0.9 && weakest >= 0.85) status = "MATCH";
  else if (score >= 0.75) status = "REVIEW";
  // One word against several ("Ramesh" vs "Ramesh Kumar") proves too little.
  if (status === "MATCH" && short.length === 1 && long.length > 1) status = "REVIEW";
  return { status, score };
}

const RANK: Record<NameMatchStatus, number> = { MATCH: 3, REVIEW: 2, MISMATCH: 1, UNKNOWN: 0 };

/** The best verdict of one name against several candidates, and which candidate produced it. */
export function bestNameMatch(name: string, candidates: (string | undefined | null)[]) {
  let best: { status: NameMatchStatus; score: number; against: string | null } = { status: "UNKNOWN", score: 0, against: null };
  candidates.forEach((candidate) => {
    if (!candidate) return;
    const result = compareNames(name, candidate);
    if (RANK[result.status] > RANK[best.status] || (result.status === best.status && result.score > best.score)) {
      best = { ...result, against: candidate };
    }
  });
  return best;
}

#!/usr/bin/env bash
# CI guard for the recurring obfuscated JS loader (see .claude/skills/scan-loader in the workspace). Runs BEFORE any install/build step.
# Fails (exit 1) on: known payload signatures, code hidden behind 100+ spaces/tabs, or an unexpected install-time hook in package.json.
# Read-only: never executes anything from the repo.
# Usage: scan-loader.sh [dir]
# Env:   ALLOW_HOOKS="postinstall=node scripts/x.js;prepare=..."  allow-lists exact, reviewed install hooks (name=command, ';'-separated).
set -euo pipefail
cd "${1:-.}"
bad=0
INCLUDE=(--include='*.js' --include='*.mjs' --include='*.cjs' --include='*.ts' --include='*.tsx' --include='*.json' --include='*.sh' --include='*.yml' --include='*.yaml')
EXCLUDE=(--exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=coverage --exclude='yarn.lock' --exclude='package-lock.json')

echo "== known payload signatures"
if grep -rnE "${INCLUDE[@]}" "${EXCLUDE[@]}" "String\.fromCharCode\(127\)|198\.105\.127\.210|For only test|global\.[a-z]\s*=\s*['\"]" . 2>/dev/null \
   | grep -v "scripts/ci/scan-loader.sh" | head -20 | grep .; then bad=1; else echo "none"; fi

echo "== code hidden behind 100+ spaces/tabs"
if grep -rnE "${INCLUDE[@]}" "${EXCLUDE[@]}" "[[:blank:]]{100,}[^[:blank:]]" . 2>/dev/null | cut -c1-120 | head -20 | grep .; then bad=1; else echo "none"; fi

echo "== install-time hooks in package.json (must be empty or allow-listed via ALLOW_HOOKS)"
if [ -f package.json ]; then
  ALLOW_HOOKS="${ALLOW_HOOKS:-}" node -e '
    const s = require("./package.json").scripts || {};
    const allow = new Set((process.env.ALLOW_HOOKS || "").split(";").map((x) => x.trim()).filter(Boolean));
    const hooks = ["preinstall","install","postinstall","prepare","prepublish","preprepare","postprepare"].filter((k) => s[k]);
    let bad = 0;
    for (const k of hooks) {
      const ok = allow.has(k + "=" + s[k]);
      console.log((ok ? "allowed    " : "UNEXPECTED ") + k + ": " + s[k]);
      if (!ok) bad = 1;
    }
    process.exit(bad);' || bad=1
fi

if [ "$bad" = 1 ]; then echo "SCAN FAILED: stop, do not install or build. Follow the scan-loader runbook."; exit 1; fi
echo "scan clean"

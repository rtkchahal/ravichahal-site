#!/usr/bin/env bash
set -euo pipefail

# ── Paths ──────────────────────────────────────────────────────────────────
WORKSPACE_DIR="$HOME/.openclaw/workspace-growth-lab/council"
SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COUNCIL_DIR="$SITE_DIR/council"
SRC_LOG="$WORKSPACE_DIR/council-log.md"
SRC_MEMO="$WORKSPACE_DIR/last-memo.md"
OUT_LOG="$COUNCIL_DIR/council-log.md"
OUT_MEMO="$COUNCIL_DIR/last-memo.md"

# ── Validate sources ────────────────────────────────────────────────────────
[[ -f "$SRC_LOG" ]]  || { echo "ERROR: $SRC_LOG not found"  >&2; exit 1; }
[[ -f "$SRC_MEMO" ]] || { echo "ERROR: $SRC_MEMO not found" >&2; exit 1; }

mkdir -p "$COUNCIL_DIR"

echo "Syncing council data..."
echo "  Source: $WORKSPACE_DIR"
echo "  Target: $COUNCIL_DIR"

# ── Python transformation ───────────────────────────────────────────────────
python3 - "$SRC_LOG" "$SRC_MEMO" "$OUT_LOG" "$OUT_MEMO" <<'PYTHON'
import sys
import re
from datetime import datetime

src_log, src_memo, out_log, out_memo = sys.argv[1:]

# ── Transform council-log.md ─────────────────────────────────────────────
raw = open(src_log).read()

# Match headers: ## YYYY-MM-DD AM/PM — Session N
header_re = re.compile(
    r'^## (\d{4}-\d{2}-\d{2}) (?:AM|PM) — Session (\d+)',
    re.MULTILINE
)
matches = list(header_re.finditer(raw))
if not matches:
    print("ERROR: No sessions found in source log", file=sys.stderr)
    sys.exit(1)

sessions = []
for i, m in enumerate(matches):
    date = m.group(1)
    num  = int(m.group(2))
    # Slice block content between this header and the next
    block_end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
    block = raw[m.end():block_end]

    # Topic from **Proposal:**
    proposal_m = re.search(r'- \*\*Proposal:\*\* (.+)', block)
    topic = proposal_m.group(1).strip() if proposal_m else '—'
    # Strip fully-surrounding quotes only (e.g. `"Foo"` → `Foo`, but not `"Foo" bar`)
    if topic.startswith('"') and topic.endswith('"') and topic.count('"') == 2:
        topic = topic[1:-1]

    # Outcome: prefer **Synthesis:**, fall back to **Refined:**
    synth_m   = re.search(r'- \*\*Synthesis:\*\* (.+)', block)
    refined_m = re.search(r'- \*\*Refined:\*\*\s+(.+)',   block)
    if synth_m:
        outcome = synth_m.group(1).strip()
    elif refined_m:
        outcome = refined_m.group(1).strip()
    else:
        outcome = '—'

    sessions.append({'num': num, 'date': date, 'topic': topic, 'outcome': outcome})

sessions.sort(key=lambda s: s['num'])

blocks = [
    f"## Session {s['num']:03d} — {s['date']}\n"
    f"**Duration:** —\n"
    f"**Topic:** {s['topic']}\n"
    f"**Outcome:** {s['outcome']}"
    for s in sessions
]
open(out_log, 'w').write('\n\n---\n\n'.join(blocks) + '\n')
print(f"  council-log.md: {len(sessions)} sessions written")

# ── Transform last-memo.md ───────────────────────────────────────────────
raw = open(src_memo).read()

# Date from title: # R&D Council Memo — YYYY-MM-DD [TIME]
title_m = re.search(r'^# R&D Council Memo — (\d{4}-\d{2}-\d{2})', raw, re.MULTILINE)
if not title_m:
    print("ERROR: Cannot parse memo date from title", file=sys.stderr)
    sys.exit(1)
memo_date = title_m.group(1)
year = memo_date[:4]

# Next session from footer: *Next council meeting: Weekday, Month Dth — ...*
next_m = re.search(
    r'\*Next council meeting: \w+, (\w+) (\d+)(?:st|nd|rd|th)',
    raw
)
if not next_m:
    print("ERROR: Cannot parse next session date from memo footer", file=sys.stderr)
    sys.exit(1)
next_date = datetime.strptime(
    f"{year} {next_m.group(1)} {next_m.group(2)}", "%Y %B %d"
).strftime("%Y-%m-%d")

# Body: everything after the title line, leading blank lines stripped
title_end = raw.index('\n', title_m.start()) + 1
body = raw[title_end:].lstrip('\n')

open(out_memo, 'w').write(
    f"---\n**Date:** {memo_date}\n**Next Session:** {next_date}\n---\n{body}"
)
print(f"  last-memo.md: date={memo_date}, next={next_date}")
PYTHON

# ── Git: commit only if council/ changed ───────────────────────────────────
cd "$SITE_DIR"
GIT_STATUS=$(git status --porcelain council/ 2>/dev/null || true)

if [[ -z "$GIT_STATUS" ]]; then
    echo "No changes in council/ — nothing to commit."
else
    echo "Changes detected:"
    echo "$GIT_STATUS"
    git add council/
    git commit -m "chore(council): auto-sync session data"
    git push
    echo "Committed and pushed."
fi

echo "Done."

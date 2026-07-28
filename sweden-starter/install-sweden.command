#!/bin/bash
# Sweden — 2-minute client install (macOS, double-clickable)
# Creates the client repo, pushes the starter payload, and hands off to
# Claude Code via ACTIVATE.md.
set -e

clear
echo "────────────────────────────────────────────"
echo "  Sweden — new client install (~2 minutes)"
echo "────────────────────────────────────────────"
echo

read -r -p "Client/brand name (display casing, e.g. 'Acme Health'): " BRAND
read -r -p "Repo slug (kebab-case, e.g. acme-designsys): " SLUG
read -r -p "GitHub owner (user or org) [foundingadmin]: " OWNER
OWNER=${OWNER:-foundingadmin}

SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/Desktop/$SLUG"

if [ -e "$DEST" ]; then
  echo "✗ $DEST already exists — move or rename it first."
  exit 1
fi

echo
echo "→ Copying starter payload to $DEST ..."
mkdir -p "$DEST"
rsync -a --exclude 'install-sweden.command' --exclude '.git' "$SRC/" "$DEST/"

echo "→ Branding files for '$BRAND' ..."
grep -rl '{{BRAND_NAME}}' "$DEST" 2>/dev/null | while IFS= read -r f; do
  sed -i '' "s/{{BRAND_NAME}}/$BRAND/g" "$f"
done

cd "$DEST"
git init -b main -q
git add -A
git commit -q -m "feat: Sweden starter install — $BRAND"

echo "→ Creating GitHub repo $OWNER/$SLUG ..."
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh repo create "$OWNER/$SLUG" --private --source . --push
else
  echo
  echo "  gh CLI not available. Create the repo manually:"
  echo "  1. Open https://github.com/new"
  echo "  2. Owner: $OWNER   Name: $SLUG   Visibility: Private"
  echo "  3. Create it EMPTY (no README), then come back here."
  read -r -p "  Press Enter once the empty repo exists... " _
  git remote add origin "https://github.com/$OWNER/$SLUG.git"
  git push -u origin main
fi

echo
echo "✓ Repo live: https://github.com/$OWNER/$SLUG"
echo

ACTIVATE_PROMPT="Read ACTIVATE.md and activate Sweden for $BRAND."
if command -v claude >/dev/null 2>&1; then
  echo "→ Launching Claude Code ..."
  exec claude "$ACTIVATE_PROMPT"
else
  echo "Final step — open Claude Code on this repo (locally in $DEST"
  echo "or at claude.ai/code) and say:"
  echo
  echo "    $ACTIVATE_PROMPT"
  echo
fi

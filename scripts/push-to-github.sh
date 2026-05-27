#!/usr/bin/env sh
set -e
cd "$(dirname "$0")/.."

REMOTE_URL="${1:-https://github.com/khyle-juggernautmarketing/blacktreeroofing.git}"

echo "→ Remote: $REMOTE_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"
git branch -M main

# Avoid HTTP 400 on pushes with large images (~15–20MB)
git config http.postBuffer 524288000
git config http.version HTTP/1.1

echo "→ Pushing main to origin..."
if git push -u origin main --force; then
  echo "✓ Push complete: $REMOTE_URL"
  exit 0
fi

echo ""
echo "Push failed — GitHub needs you to sign in once."
echo ""
echo "Option A — HTTPS (Personal Access Token):"
echo "  1. Create repo: https://github.com/new  (name: blacktreeroofing)"
echo "  2. Token: https://github.com/settings/tokens  (scope: repo)"
echo "  3. Run: git push -u origin main --force"
echo "     Username: your GitHub username"
echo "     Password: paste the token (not your GitHub password)"
echo ""
echo "Option B — SSH:"
echo "  1. Add ~/.ssh/id_ed25519.pub at https://github.com/settings/keys"
echo "  2. git remote set-url origin git@github.com:khyle-juggernautmarketing/blacktreeroofing.git"
echo "  3. git push -u origin main --force"
exit 1

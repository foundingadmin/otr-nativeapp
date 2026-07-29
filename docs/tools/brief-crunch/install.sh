#!/bin/zsh
# One-time installer for brief-crunch. Run: zsh install.sh
set -e
command -v brew >/dev/null || { echo "Homebrew required: https://brew.sh"; exit 1; }
brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
brew list whisper-cpp >/dev/null 2>&1 || brew install whisper-cpp
mkdir -p "$HOME/.brief-crunch"
[[ -f "$HOME/.brief-crunch/ggml-base.en.bin" ]] || \
  curl -L -o "$HOME/.brief-crunch/ggml-base.en.bin" \
  "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin"
cp "$(dirname "$0")/crunch.sh" "$HOME/.brief-crunch/crunch.sh"
chmod +x "$HOME/.brief-crunch/crunch.sh"
BRIEFS_DIR="$(ls -d "$HOME"/Library/CloudStorage/GoogleDrive-*/"My Drive"/00-Personal/"Video Briefs 🎥" 2>/dev/null | head -1)"
PLIST="$HOME/Library/LaunchAgents/com.foundingcreative.briefcrunch.plist"
cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.foundingcreative.briefcrunch</string>
  <key>ProgramArguments</key><array>
    <string>/bin/zsh</string><string>$HOME/.brief-crunch/crunch.sh</string>
  </array>
  <key>WatchPaths</key><array><string>$BRIEFS_DIR</string></array>
  <key>ThrottleInterval</key><integer>15</integer>
</dict></plist>
PL
launchctl unload "$PLIST" 2>/dev/null || true
launchctl load "$PLIST"
echo "brief-crunch installed. Watching: $BRIEFS_DIR"
echo "Record with Cmd+Shift+5 as usual; ~30s after you stop, a compact .mp4 + .srt appear and the original moves to _originals/."

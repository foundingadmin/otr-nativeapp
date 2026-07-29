#!/bin/zsh
# brief-crunch · watches the Video Briefs folder, transcodes new recordings
# to compact 720p mp4 and writes an .srt transcript beside each one.
# Originals move to _originals/ (purge whenever you like).
# Deps: brew install ffmpeg whisper-cpp   (install.sh handles everything)

BRIEFS_DIR="${BRIEFS_DIR:-$(ls -d "$HOME"/Library/CloudStorage/GoogleDrive-*/"My Drive"/00-Personal/"Video Briefs 🎥" 2>/dev/null | head -1)}"
MODEL="$HOME/.brief-crunch/ggml-base.en.bin"
cd "$BRIEFS_DIR" || exit 1
mkdir -p _originals

for f in *.mov(N); do
  base="${f%.mov}"
  [[ -e "$base.mp4" ]] && continue
  # wait until the file stops growing (Drive sync / recorder finishing)
  s1=$(stat -f %z "$f"); sleep 4; s2=$(stat -f %z "$f")
  [[ "$s1" != "$s2" ]] && continue    # still writing; next run picks it up
  ffmpeg -i "$f" -vf "scale=-2:720" -r 15 -c:v libx264 -crf 28 -preset veryfast \
         -c:a aac -b:a 96k "$base.mp4" -y -loglevel error || continue
  ffmpeg -i "$base.mp4" -ar 16000 -ac 1 "/tmp/$base.wav" -y -loglevel error
  whisper-cli -m "$MODEL" -f "/tmp/$base.wav" -osrt -of "$base" >/dev/null 2>&1
  rm -f "/tmp/$base.wav"
  mv "$f" "_originals/$f"
done

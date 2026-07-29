# brief-crunch

Companion for the video-brief pipe. Keeps the native macOS recorder flow
(Cmd+Shift+5 → Return) and fixes the two rough edges automatically:

- 300MB retina .mov → ~15-30MB 720p .mp4 (agent decode gets ~10x faster)
- transcript (.srt) generated locally on the Mac, so the agent skips
  transcription entirely and reads the .srt straight from Drive

Install once: `zsh install.sh`. It brews ffmpeg + whisper-cpp, downloads the
base.en model, and loads a launchd watcher on the Video Briefs folder.
Originals are kept in `_originals/` until you purge them.

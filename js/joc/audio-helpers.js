// ═══════════════════════════════════
// AUDIO FADE-OUT HELPER
// ═══════════════════════════════════
function stopAudio(aud, fadeMs) {
  if (!aud) return;
  // Handle the fake timer object (no volume property, has pause())
  if (typeof aud.volume === 'undefined') {
    try { aud.pause(); } catch(e) {}
    return;
  }
  // Real HTMLAudioElement — immediate hard stop (most reliable)
  try {
    aud.volume = 0;
    aud.pause();
    aud.currentTime = 0;
  } catch(e) {}
}
const cache = new Map<string, HTMLAudioElement>();

export function playSound(src: string, volume = 0.5) {
  try {
    let audio = cache.get(src);
    if (!audio) {
      audio = new Audio(src);
      cache.set(src, audio);
    }
    audio.volume = volume;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  } catch {
    // Autoplay restrictions or missing Audio support — sound is decorative
  }
}

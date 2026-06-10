/**
 * Ambient Sound — Plays /ambient-music.mp3 with smooth fade-in/out
 * Triggered by the SOUND button in the Navigation bar.
 */

let audio: HTMLAudioElement | null = null;
let isPlaying = false;
let fadeInterval: ReturnType<typeof setInterval> | null = null;

const TARGET_VOLUME = 0.6;
const FADE_STEP = 0.02;
const FADE_INTERVAL_MS = 30;

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio("/ambient-music.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
  }
  return audio;
}

function clearFade() {
  if (fadeInterval !== null) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function fadeIn(el: HTMLAudioElement) {
  clearFade();
  el.volume = 0;
  fadeInterval = setInterval(() => {
    if (el.volume < TARGET_VOLUME - FADE_STEP) {
      el.volume = Math.min(el.volume + FADE_STEP, TARGET_VOLUME);
    } else {
      el.volume = TARGET_VOLUME;
      clearFade();
    }
  }, FADE_INTERVAL_MS);
}

function fadeOut(el: HTMLAudioElement) {
  clearFade();
  fadeInterval = setInterval(() => {
    if (el.volume > FADE_STEP) {
      el.volume = Math.max(el.volume - FADE_STEP, 0);
    } else {
      el.volume = 0;
      el.pause();
      clearFade();
    }
  }, FADE_INTERVAL_MS);
}

export const toggleAmbientSound = (on: boolean) => {
  const el = ensureAudio();

  if (on) {
    el.play().then(() => {
      fadeIn(el);
      isPlaying = true;
    }).catch((err) => {
      console.warn("Ambient audio play failed:", err.message);
    });
  } else {
    fadeOut(el);
    isPlaying = false;
  }
};

export const getIsPlaying = () => isPlaying;

/**
 * useVoice — Speech-to-Text hook (Web Speech API)
 * States: idle | listening | processing
 */

import { useState, useCallback, useRef } from "react";

export type VoiceState = "idle" | "listening" | "processing";

// Check browser support
const SpeechRecognitionAPI =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

export const isVoiceSupported = !!SpeechRecognitionAPI;

export function useVoice() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>(null);
  // Use a ref to track the latest voice state (avoids stale closures)
  const voiceStateRef = useRef<VoiceState>("idle");

  const updateState = (state: VoiceState) => {
    voiceStateRef.current = state;
    setVoiceState(state);
  };

  /**
   * Start listening (Speech-to-Text)
   */
  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!SpeechRecognitionAPI) {
      console.warn("Speech Recognition is not supported in this browser.");
      return;
    }

    // Stop any existing session first
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      let finalTranscript = "";

      recognition.onstart = () => {
        updateState("listening");
        setTranscript("");
        finalTranscript = "";
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        setTranscript(final || interim);

        if (final) {
          finalTranscript = final.trim();
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);

        // "not-allowed" = microphone permission denied
        // "no-speech" = no speech detected (timeout)
        // "aborted" = user or system cancelled
        if (event.error === "not-allowed") {
          console.error("Microphone permission denied. Please allow microphone access.");
        }

        updateState("idle");
        setTranscript("");
      };

      recognition.onend = () => {
        // If we got a final transcript, send it
        if (finalTranscript) {
          updateState("processing");
          const result = onResult(finalTranscript);
          // Handle both sync and async onResult
          Promise.resolve(result).finally(() => {
            updateState("idle");
            setTranscript("");
          });
        } else {
          // No speech detected — just reset
          updateState("idle");
          setTranscript("");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      updateState("idle");
    }
  }, []);

  /**
   * Stop listening
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    updateState("idle");
    setTranscript("");
  }, []);

  return {
    voiceState,
    transcript,
    isVoiceSupported,
    startListening,
    stopListening,
  };
}

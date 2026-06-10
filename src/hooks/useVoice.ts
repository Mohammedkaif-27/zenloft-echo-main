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

  /**
   * Start listening (Speech-to-Text)
   */
  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setVoiceState("listening");
      setTranscript("");
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
        setVoiceState("processing");
        Promise.resolve(onResult(final.trim())).finally(() => {
          setVoiceState("idle");
          setTranscript("");
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setVoiceState("idle");
      setTranscript("");
    };

    recognition.onend = () => {
      if (voiceState === "listening") {
        // If we ended without getting a final result, use interim
        setVoiceState("idle");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [voiceState]);

  /**
   * Stop listening
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState("idle");
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

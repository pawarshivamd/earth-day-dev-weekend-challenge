import { useState, useCallback, useEffect } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel(); // Stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a deep, natural, or UK english voice for Earth
    const earthVoice = voices.find(v => 
      v.name.includes('Google UK English Male') || 
      v.name.includes('Microsoft David') ||
      v.name.includes('Google US English') ||
      v.name.includes('Samantha')
    ) || voices[0];
    if (earthVoice) {
      utterance.voice = earthVoice;
    }

    utterance.pitch = 0.4; // Epic deep resonance
    utterance.rate = 0.8; // Speak slowly with gravitas

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [isSupported]);

  return { speak, stop, isPlaying, isSupported };
}

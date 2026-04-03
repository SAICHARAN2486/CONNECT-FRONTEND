import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Headphones, Volume2, Info, AlertCircle } from 'lucide-react';
import MicrophoneButton from '../components/MicrophoneButton';
import WaveAnimation from '../components/WaveAnimation';
import LanguageDisplayCard from '../components/LanguageDisplayCard';
import API from '../utils/api';
import { toast } from 'react-toastify';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(''); // telugu, hindi, english
    const [transcription, setTranscription] = useState('');
    const [results, setResults] = useState(null); // { user: {}, ai: {} }

    const recognitionRef = useRef(null);
    const synthesisRef = window.speechSynthesis;

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US'; // Default, but it detects multiple

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscription(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                if (transcription) {
                    processVoiceCommand(transcription);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech Recognition Error:', event.error);
                setIsListening(false);
                toast.error('Could not hear you. Please try again.');
            };
        }
    }, [transcription]);

    const startListening = () => {
        if (!recognitionRef.current) {
            toast.error('Speech recognition not supported in this browser.');
            return;
        }
        setTranscription('');
        setResults(null);
        setIsListening(true);
        recognitionRef.current.start();
    };

    const processVoiceCommand = async (text) => {
        try {
            const res = await API.post('/ai/voice-assistant', {
                text,
                history: history.slice(-5) // Send last 5 exchanges
            });
            setResults(res.data);
            setHistory(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: res.data.ai.english }]);
            speakResponses(res.data.ai);
        } catch (error) {
            toast.error('AI Assistant is currently unavailable.');
        }
    };

    const speakResponses = async (ai) => {
        setIsSpeaking(true);

        const speak = (text, lang, next) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;

            // Set voice based on language
            const voices = synthesisRef.getVoices();
            if (lang === 'te-IN') {
                utterance.voice = voices.find(v => v.lang.includes('te')) || voices[0];
                setCurrentLanguage('telugu');
            } else if (lang === 'hi-IN') {
                utterance.voice = voices.find(v => v.lang.includes('hi')) || voices[0];
                setCurrentLanguage('hindi');
            } else {
                utterance.voice = voices.find(v => v.lang.includes('en')) || voices[0];
                setCurrentLanguage('english');
            }

            utterance.onend = () => {
                if (next) next();
                else {
                    setIsSpeaking(false);
                    setCurrentLanguage('');
                }
            };
            synthesisRef.speak(utterance);
        };

        // Speak sequentially: Telugu -> English -> Hindi
        speak(ai.telugu, 'te-IN', () => {
            speak(ai.english, 'en-US', () => {
                speak(ai.hindi, 'hi-IN');
            });
        });
    };

    return (
        <div className="space-y-10 pb-20 max-w-6xl mx-auto">
            <header className="text-center space-y-4">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl font-black gradient-text"
                >
                    Multilingual AI Voice Assistant
                </motion.h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A simple way to get career help. Speak in Telugu, Hindi, or English and let the AI guide you.
                </p>
            </header>

            {/* Interaction Area */}
            <div className="flex flex-col items-center justify-center p-12 glass-card bg-primary/5 min-h-[400px] relative overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="blob w-full h-full bg-primary/40 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-10 w-full text-center">
                    <WaveAnimation isActive={isListening || isSpeaking} color={isListening ? "bg-red-400" : "bg-primary"} />

                    <MicrophoneButton
                        isListening={isListening}
                        onClick={isListening ? () => recognitionRef.current.stop() : startListening}
                    />

                    <AnimatePresence>
                        {(isListening || transcription) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-2"
                            >
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">You said:</p>
                                <p className="text-2xl font-bold italic">"{transcription || 'Listening...'}"</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isSpeaking && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold animate-pulse">
                            <Headphones size={20} /> Speaking in {currentLanguage.toUpperCase()}...
                        </div>
                    )}
                </div>
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {results && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                    >
                        {/* User Translations */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Info className="text-slate-400" size={20} /> How we understood you
                            </h3>
                            <div className="flex flex-wrap gap-6">
                                <LanguageDisplayCard title="Telugu" flag="🇮🇳" langLabel="తెలుగు" text={results.user.telugu} delay={0.1} />
                                <LanguageDisplayCard title="English" flag="🇺🇸" langLabel="English" text={results.user.english} delay={0.2} />
                                <LanguageDisplayCard title="Hindi" flag="🇮🇳" langLabel="हिन्दी" text={results.user.hindi} delay={0.3} />
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Volume2 className="text-primary" size={20} /> AI Assistant Response
                            </h3>
                            <div className="flex flex-wrap gap-6">
                                <LanguageDisplayCard title="Telugu" flag="🇮🇳" langLabel="తెలుగు" text={results.ai.telugu} delay={0.4} />
                                <LanguageDisplayCard title="English" flag="🇺🇸" langLabel="English" text={results.ai.english} delay={0.5} />
                                <LanguageDisplayCard title="Hindi" flag="🇮🇳" langLabel="हिन्दी" text={results.ai.hindi} delay={0.6} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Simple Instructions for Uneducated Users */}
            <div className="flex gap-4 p-6 rounded-2xl border-2 border-primary/20 bg-primary/5">
                <AlertCircle className="text-primary shrink-0" size={24} />
                <div className="space-y-2">
                    <h4 className="font-bold">How to use / ఎలా ఉపయోగించాలి / कैसे उपयोग करें</h4>
                    <p className="text-sm text-slate-400">
                        1. Click the Blue microphone button.<br />
                        2. Speak clearly in any language.<br />
                        3. Wait for the AI to speak back to you in Telugu, English, and Hindi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VoiceAssistant;

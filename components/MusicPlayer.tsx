"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ url, autoPlay }: { url: string; autoPlay: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playAudio = () => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Autoplay blocked, waiting for interaction", err);
        });
      };
      playAudio();
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={url} loop />
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/80 backdrop-blur-md text-rose-500 rounded-full shadow-lg border border-rose-100 flex items-center justify-center"
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music2 size={24} />
          </motion.div>
        ) : (
          <Music size={24} />
        )}
      </motion.button>
    </div>
  );
}

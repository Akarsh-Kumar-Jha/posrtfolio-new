'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaVolumeMute,
  FaVolumeUp,
  FaHeadphones,
} from 'react-icons/fa';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface BlogAudioSummaryProps {
  blogId: string | number;
}

type UIState = 'idle' | 'loading' | 'ready' | 'error';

export default function BlogAudioSummary({ blogId }: BlogAudioSummaryProps) {
  const [uiState, setUiState] = useState<UIState>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState<string | null>(null);

  // Audio playback states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to m:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Check initial cache status on mount
  useEffect(() => {
    let isMounted = true;

    async function checkExistingCache() {
      try {
        const res = await fetch(`/api/blog/${blogId}/audio-summary`);
        if (!res.ok) return;
        const data = await res.json();

        if (!isMounted) return;

        if (data.status === 'completed' && data.audioUrl) {
          const freshUrl = data.audioUrl.includes('?') 
            ? data.audioUrl 
            : `${data.audioUrl}?t=${Date.now()}`;
          setAudioUrl(freshUrl);
          if (data.summary) setSummaryText(data.summary);
          if (data.duration && data.duration > 0) setDuration(data.duration);
          setUiState('ready');
        } else if (data.status === 'processing') {
          setUiState('loading');
          startPolling();
        }
      } catch (err) {
        console.error('Check audio summary error:', err);
      }
    }

    checkExistingCache();

    return () => {
      isMounted = false;
      stopPolling();
    };
  }, [blogId]);

  // Audio HTML Element Event Handlers & Lifecycle
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.playbackRate = playbackRate;
    audio.muted = isMuted;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.round(audio.duration));
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
    };
    const handleError = (e: Event) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
      setUiState('error');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const startPolling = () => {
    stopPolling();
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/blog/${blogId}/audio-summary`);
        const data = await res.json();
        if (data.status === 'completed' && data.audioUrl) {
          stopPolling();
          setAudioUrl(data.audioUrl);
          if (data.summary) setSummaryText(data.summary);
          if (data.duration) setDuration(data.duration);
          setUiState('ready');
        } else if (data.status === 'failed') {
          stopPolling();
          console.error('Audio summary generation failed:', data.details);
          setUiState('error');
        }
      } catch (e) {
        // Continue polling quietly
      }
    }, 3000);
  };

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  // Trigger Generation or Play
  const handleGenerateOrPlay = async () => {
    if (uiState === 'ready' && audioRef.current) {
      togglePlayPause();
      return;
    }

    setUiState('loading');

    try {
      const res = await fetch(`/api/blog/${blogId}/audio-summary`, {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Audio Summary API error:', data.details || data.error);
        throw new Error('Generation failed');
      }

      if (data.status === 'completed' && data.audioUrl) {
        const freshUrl = data.audioUrl.includes('?') 
          ? data.audioUrl 
          : `${data.audioUrl}?t=${Date.now()}`;
        setAudioUrl(freshUrl);
        if (data.summary) setSummaryText(data.summary);
        if (data.duration && data.duration > 0) setDuration(data.duration);
        setHasEnded(false);
        setCurrentTime(0);
        setUiState('ready');
        // Auto play on generation completion
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setHasEnded(false);
              })
              .catch((err) => console.error('Audio play error:', err));
          }
        }, 100);
      } else if (data.status === 'processing') {
        startPolling();
      }
    } catch (err) {
      console.error('Audio summary request failed:', err);
      setUiState('error');
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (hasEnded) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setHasEnded(false);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    setHasEnded(false);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  return (
    <div className="w-full my-6 bg-card border border-border/80 rounded-xl p-4 font-sans transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaHeadphones className="text-sm text-foreground/80" />
          <span className="text-sm font-semibold text-foreground tracking-tight">
            Listen to Summary
          </span>
        </div>
        <span className="text-xs font-mono text-foreground/60">
          ~{Math.max(1, Math.round(duration / 60))} min
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {uiState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-4 pt-1"
          >
            <p className="text-xs text-foreground/70">
              Get a quick audio overview of this article.
            </p>
            <Button
              onClick={handleGenerateOrPlay}
              className="bg-primary hover:bg-accent text-black font-semibold cursor-pointer flex items-center gap-2 px-4 py-1.5 text-xs rounded-lg transition-transform hover:scale-105 active:scale-95 shrink-0"
            >
              <FaPlay className="text-[10px]" /> Play Summary
            </Button>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {uiState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-4 py-1.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-foreground/80">
                Preparing your summary...
              </span>
            </div>
            <span className="text-xs text-foreground/50 hidden sm:inline">
              This will take a few seconds
            </span>
          </motion.div>
        )}

        {/* READY STATE - AUDIO PLAYER */}
        {uiState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2.5"
          >
            {/* Player Controls Bar */}
            <div className="flex items-center gap-3">
              {/* Play / Pause / Replay Button */}
              <button
                onClick={togglePlayPause}
                aria-label={
                  hasEnded
                    ? 'Replay summary'
                    : isPlaying
                    ? 'Pause summary'
                    : 'Play summary'
                }
                title={
                  hasEnded
                    ? 'Replay summary'
                    : isPlaying
                    ? 'Pause summary'
                    : 'Play summary'
                }
                className="size-9 rounded-full bg-primary hover:bg-accent text-black font-semibold flex items-center justify-center cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {hasEnded ? (
                  <FaRedo className="text-xs" />
                ) : isPlaying ? (
                  <FaPause className="text-xs" />
                ) : (
                  <FaPlay className="text-xs ml-0.5" />
                )}
              </button>

              {/* Seek Bar */}
              <div className="flex-1 flex items-center relative">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Audio progress slider"
                  className="w-full h-1 bg-border/60 hover:bg-border rounded-full appearance-none cursor-pointer accent-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Time Display */}
              <span className="text-xs font-mono text-foreground/70 shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Speed Button */}
              <button
                onClick={handleSpeedChange}
                aria-label={`Playback speed ${playbackRate}x`}
                title="Change playback speed"
                className="px-2 py-0.5 bg-secondary hover:bg-accent text-black font-mono font-bold text-xs rounded border border-border shrink-0 cursor-pointer transition-colors"
              >
                {playbackRate}x
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
                className="p-1 text-foreground/70 hover:text-foreground transition-colors cursor-pointer shrink-0"
              >
                {isMuted ? (
                  <FaVolumeMute className="text-xs text-red-400" />
                ) : (
                  <FaVolumeUp className="text-xs" />
                )}
              </button>
            </div>

            {/* Transcript Toggle & Expandable Content */}
            {summaryText && (
              <div className="flex flex-col mt-1">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="self-end text-[11px] text-foreground/60 hover:text-foreground flex items-center gap-0.5 cursor-pointer transition-colors"
                >
                  {showTranscript ? (
                    <>
                      Hide transcript <BiChevronUp className="text-sm" />
                    </>
                  ) : (
                    <>
                      Show transcript <BiChevronDown className="text-sm" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 mt-1 border-t border-border/50 text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
                        {summaryText}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ERROR STATE */}
        {uiState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-4 py-1"
          >
            <span className="text-xs text-foreground/80 font-medium">
              We couldn&apos;t prepare the summary right now.
            </span>
            <Button
              onClick={handleGenerateOrPlay}
              className="bg-secondary hover:bg-accent text-foreground font-medium border border-border/80 cursor-pointer px-3 py-1 text-xs rounded-lg transition-colors shrink-0"
            >
              Try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

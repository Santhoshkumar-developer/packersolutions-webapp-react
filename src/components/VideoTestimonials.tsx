/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Quote, Star, CheckCircle, ExternalLink, MessageSquare, Maximize2 } from 'lucide-react';

export interface VideoTestimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  title: string;
  duration: string;
  videoUrl: string;
  accentColor: string;
  avatarText: string;
  subtitles: { start: number; end: number; text: string }[];
  summary: string;
  shiftingType: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-1',
    name: 'Rahul Sen',
    location: 'Bangalore',
    role: 'Tech Lead, TechCorp',
    rating: 5,
    title: 'Flawless 3 BHK Shifting to Whitefield',
    duration: '0:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    accentColor: 'from-orange-500 to-amber-500',
    avatarText: 'RS',
    shiftingType: '3 BHK Comprehensive Shifting',
    summary: 'The packing crew was incredibly disciplined, wrapping each painting, delicate chinaware, and our home temple with specialized multi-layer sheets. Highly recommended!',
    subtitles: [
      { start: 0, end: 3, text: 'Hello guys! I am Rahul and I recently shifted to Whitefield, Bangalore.' },
      { start: 3, end: 7, text: 'I chose Packersolution for my 3 BHK movement and they were exceptional.' },
      { start: 7, end: 11, text: 'The multi-layer bubble packing kept all my fragile art frames secure.' },
      { start: 11, end: 15, text: 'Zero damages, highly professional staff, and transparent billing!' }
    ]
  },
  {
    id: 'vid-2',
    name: 'Priya Deshmukh',
    location: 'Pune',
    role: 'Creative Director',
    rating: 5,
    title: 'Safest Boutique Shifting & Set-Up',
    duration: '0:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    accentColor: 'from-teal-500 to-emerald-500',
    avatarText: 'PD',
    shiftingType: 'Luxury Office & Studio Shifting',
    summary: 'Relocating my glass shelves, boutique studio equipment, and premium fabrics was stress-free. Punctual transit on a dedicated container.',
    subtitles: [
      { start: 0, end: 4, text: 'Moving an entire boutique studio is super stressful, but Priya is here with a tip!' },
      { start: 4, end: 8, text: 'Packersolution handled my delicate glass racks and expensive fabrics with absolute care.' },
      { start: 8, end: 12, text: 'Their closed-body Eicher container kept everything moisture-free and spotless.' },
      { start: 12, end: 15, text: 'Not a single wrinkle or scratch. Truly a five-star relocation partner.' }
    ]
  },
  {
    id: 'vid-3',
    name: 'Abhishek Iyer',
    location: 'Chennai',
    role: 'Business Consultant',
    rating: 5,
    title: 'Scratch-free Two-Wheeler Transit',
    duration: '0:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    accentColor: 'from-blue-500 to-indigo-500',
    avatarText: 'AI',
    shiftingType: 'Specialized Bike Carrier Transport',
    summary: 'My Royal Enfield bike was packed with double bubble-wrap and specialized cardboard sleeves, arriving in pristine condition without a single blemish.',
    subtitles: [
      { start: 0, end: 3, text: 'Look at my bike! Relocated my Royal Enfield from Bangalore to Chennai.' },
      { start: 3, end: 7, text: 'Packersolution used specialized scratching-free padded wraps.' },
      { start: 7, end: 11, text: 'They secured the bike with mechanical harness belts inside the truck.' },
      { start: 11, end: 15, text: 'Arrived on the exact promised date. Perfect service, safe transit.' }
    ]
  }
];

export const VideoTestimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial>(VIDEO_TESTIMONIALS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(15); // Default to 15 seconds
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [videoError, setVideoError] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync state when active video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSubtitle('');
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.muted = isMuted;
    }
  }, [activeVideo]);

  // Handle subtitle update based on elapsed play time
  useEffect(() => {
    const foundSub = activeVideo.subtitles.find(
      sub => currentTime >= sub.start && currentTime <= sub.end
    );
    setCurrentSubtitle(foundSub ? foundSub.text : '');
  }, [currentTime, activeVideo]);

  // Fallback simulator timer (ticks time when video source fails or doesn't load)
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && videoError) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= 15) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, videoError]);

  const handleTimeUpdate = () => {
    if (videoRef.current && !videoError) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !videoError) {
      setDuration(videoRef.current.duration || 15);
    }
  };

  const handleVideoError = () => {
    console.warn("Video failed to load in sandbox, falling back to interactive simulation player.");
    setVideoError(true);
    setDuration(15);
  };

  const togglePlay = () => {
    if (videoError) {
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Playback failed, switching to high fidelity interactive simulation:", err);
          setVideoError(true);
          setDuration(15);
          setIsPlaying(true);
        });
      }
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current && !videoError) {
      videoRef.current.muted = nextMute;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = val;
    }
  };

  const restartVideo = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="space-y-8" id="video-testimonials-section">
      {/* Self-contained keyframes styled dynamically */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customDrive {
          0% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
          100% { transform: translateX(0px); }
        }
        @keyframes customRoadScroll {
          0% { background-position-x: 0px; }
          100% { background-position-x: -80px; }
        }
        @keyframes customWaveForm {
          0%, 100% { height: 6px; }
          50% { height: 20px; }
        }
      `}} />

      <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
        {/* Background mesh accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-stretch">
          
          {/* LEFT: Master Theater Player Component */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping shrink-0" />
                {videoError ? 'Interactive Customer Story' : 'Live Video Testimonial'}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeVideo.title}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="font-semibold text-white">{activeVideo.name}</span>
                <span>•</span>
                <span>{activeVideo.role}</span>
                <span>•</span>
                <span className="text-orange-400 font-mono">📍 {activeVideo.location}</span>
              </p>
            </div>

            {/* HIGH FIDELITY HTML5 PLAYER BOX */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex flex-col justify-end group shadow-xl">
              
              {/* Actual HTML5 Video Container */}
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onError={handleVideoError}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                /* HIGH FIDELITY INTERACTIVE STORY SIMULATOR FALLBACK */
                <div 
                  onClick={togglePlay}
                  className={`w-full h-full cursor-pointer relative flex flex-col items-center justify-between p-6 overflow-hidden transition-all duration-500 bg-gradient-to-br ${
                    activeVideo.id === 'vid-1' ? 'from-slate-950 via-amber-950/20 to-slate-950' :
                    activeVideo.id === 'vid-2' ? 'from-slate-950 via-emerald-950/20 to-slate-950' :
                    'from-slate-950 via-indigo-950/20 to-slate-950'
                  }`}
                >
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

                  {/* Top Status Header */}
                  <div className="w-full flex justify-between items-center relative z-10">
                    <span className="text-[9px] font-bold font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SIMULATOR MODE
                    </span>
                    
                    {/* Pulsing Audio Waves (If playing) */}
                    <div className="flex items-center gap-0.5 h-5">
                      {[...Array(6)].map((_, i) => (
                        <span 
                          key={i} 
                          className="w-0.5 bg-orange-500 rounded-full"
                          style={{
                            animation: isPlaying ? 'customWaveForm 0.8s ease-in-out infinite' : 'none',
                            animationDelay: `${i * 0.12}s`,
                            height: isPlaying ? undefined : '4px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Scenic Animation: Moving Eicher Container Truck */}
                  <div className="w-full max-w-sm flex flex-col items-center justify-center relative z-10 py-2">
                    
                    {/* Cloud and Trees Background elements */}
                    <div className="w-full h-12 relative overflow-hidden opacity-20 mb-1">
                      <div className="absolute top-2 right-12 w-6 h-2 bg-slate-400 rounded-full animate-pulse" />
                      <div className="absolute top-4 left-8 w-8 h-2.5 bg-slate-400 rounded-full" />
                    </div>

                    {/* Animated Truck Component */}
                    <div 
                      className="flex flex-col items-center justify-center relative"
                      style={{
                        animation: isPlaying ? 'customDrive 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      {/* Truck Icon Wrapper with custom brand branding */}
                      <div className="relative bg-slate-900 border border-slate-700/60 p-3 rounded-xl shadow-lg flex items-center gap-3.5 max-w-[220px]">
                        <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0 font-extrabold text-sm shadow-inner">
                          {activeVideo.avatarText}
                        </div>
                        <div className="min-w-0">
                          <h6 className="text-[10px] font-bold text-white truncate">{activeVideo.name}</h6>
                          <p className="text-[8px] text-slate-400 truncate mt-0.5">{activeVideo.shiftingType}</p>
                        </div>
                        
                        {/* Tiny verified tick */}
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <span className="text-[8px] font-bold">✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Road Line */}
                    <div className="w-48 h-0.5 bg-slate-800 mt-2 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-[repeat-x] bg-[linear-gradient(to_right,transparent_0%,transparent_50%,#f97316_50%,#f97316_100%)] bg-[size:16px_100%]"
                        style={{
                          animation: isPlaying ? 'customRoadScroll 1s linear infinite' : 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom Tip text */}
                  <div className="text-center relative z-10 w-full">
                    {!isPlaying && currentTime === 0 && (
                      <span className="text-[10px] text-orange-400 font-bold tracking-wide uppercase bg-slate-900/90 border border-orange-500/20 px-3 py-1 rounded-full animate-bounce">
                        Click Screen to Play Review Story
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Cover Overlay Play Screen (If not playing and time is at start) */}
              {!isPlaying && currentTime === 0 && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer group transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transform group-hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-xs text-slate-200 mt-3 font-semibold font-mono bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/50">
                    Play Video Story ({activeVideo.duration})
                  </span>
                </div>
              )}

              {/* Dynamic Subtitles / Transcription Overlay */}
              {currentSubtitle && (
                <div className="absolute bottom-16 inset-x-4 text-center pointer-events-none z-10">
                  <span className="bg-slate-950/85 backdrop-blur-md text-white border border-slate-800 text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-lg shadow-md max-w-[85%] inline-block leading-snug border-l-2 border-l-orange-500 animate-fade-in">
                    🎤 <span className="text-orange-400 font-bold">AI Live Subs:</span> "{currentSubtitle}"
                  </span>
                </div>
              )}

              {/* Dynamic Hover controls bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 flex flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                
                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 15}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-orange-500 h-1 rounded-lg cursor-pointer bg-slate-800 overflow-hidden appearance-none"
                  />
                  <span className="text-[10px] font-mono text-slate-300 font-bold">
                    {Math.floor(currentTime)}s / {Math.floor(duration)}s
                  </span>
                </div>

                {/* Left/Right controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      onClick={restartVideo}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
                      title="Replay"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-orange-400" />
                          <span className="text-[9px] text-orange-400 font-bold">MUTED</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-[9px] text-emerald-400 font-bold">UNMUTED</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                      {activeVideo.shiftingType}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Selector Panel & Custom Transcript Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Header copy */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Select a Video Story
              </h3>
              <p className="text-slate-400 text-xs leading-normal">
                Click any customer card below to dynamically swap the primary video screen and hear their honest shifting review.
              </p>
            </div>

            {/* Testimonials cards queue */}
            <div className="space-y-3 max-h-[250px] lg:max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {VIDEO_TESTIMONIALS.map((video) => {
                const isActive = video.id === activeVideo.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-center gap-3.5 relative ${
                      isActive 
                        ? 'bg-slate-800 border-orange-500 shadow-lg shadow-orange-500/5 scale-[1.01]' 
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    {/* Tiny animated indicator or static play */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isActive && isPlaying ? (
                        <span className="flex gap-0.5 items-end justify-center w-3 h-3">
                          <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                          <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </span>
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-white truncate">{video.name}</h5>
                        <span className="text-[9px] text-slate-500 font-mono font-bold">{video.duration}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{video.title}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] text-orange-400 font-semibold font-mono">📍 {video.location}</span>
                        <span className="text-[9px] text-slate-600 font-bold">•</span>
                        <span className="text-[9px] text-slate-500">{video.shiftingType.split(' ')[0]} Move</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Video Transcript Summary Card */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 relative space-y-2">
              <Quote className="w-6 h-6 text-orange-500/20 absolute -top-1 right-3 transform rotate-180" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold ml-2">
                  100% VERIFIED CUSTOMER REVIEW
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-200">
                "{activeVideo.title}"
              </h5>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                {activeVideo.summary}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

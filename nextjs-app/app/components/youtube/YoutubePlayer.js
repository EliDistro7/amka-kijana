'use client';

import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

const YouTubePlayer = ({ 
  videoId, 
  title = "YouTube Video",
  autoplay = false,
  showTitle = true,
  aspectRatio = "16:9" // Can be "16:9", "4:3", "21:9"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(!autoplay);

  // Extract video ID from URL if full URL is provided
  const extractVideoId = (url) => {
    if (!url) return '';
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const finalVideoId = extractVideoId(videoId);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "4:3":
        return "aspect-[4/3]";
      case "21:9":
        return "aspect-[21/9]";
      default:
        return "aspect-video";
    }
  };

  const handlePlay = () => {
    setShowPlayButton(false);
    setIsLoaded(true);
  };

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${finalVideoId}`, '_blank');
  };

  if (!finalVideoId) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-20 px-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-12 text-center border border-red-200">
          <p className="text-red-600 text-lg font-medium">Invalid YouTube video ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-0 mb-20 px-0">
      {/* Title */}
      {showTitle && (
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-3xl px-4 md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h3>
          <button
            onClick={openInYouTube}
            className="group p-3 rounded-xl bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-red-200"
            title="Open in YouTube"
          >
            <ExternalLink size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Video Container */}
      <div className="relative group">
             <div className="absolute group-hover:opacity-30 transition-opacity duration-500"></div>
        
        {/* Main container */}
        <div className="relative shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-all duration-500">
          {/* Video wrapper */}
          <div className={`relative ${getAspectRatioClass()} overflow-hidden`}>
            {/* YouTube iframe */}
            {isLoaded ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                {/* Thumbnail image with overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={`https://img.youtube.com/vi/${finalVideoId}/maxresdefault.jpg`}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Dark overlay for better contrast */}
                  <div className="absolute inset-0 transition-all duration-300"></div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="group/play relative z-10"
                    aria-label="Play video"
                  >
                    {/* Animated ring */}
                    <div className="absolute inset-0 w-44 h-44 rounded-full border-4 border-white/30 animate-ping"></div>
                    
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 w-44 h-44 rounded-full bg-gradient-to-r from-red-400 to-red-600 opacity-20 blur-xl group-hover/play:opacity-30 transition-opacity duration-300"></div>
                    
                    {/* Main play button */}
                    <div className="relative w-44 h-44 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-white transition-all duration-300 border-4 border-white/50">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover/play:shadow-xl group-hover/play:from-red-600 group-hover/play:to-red-700 transition-all duration-300">
                        <Play 
                          size={32} 
                          className="text-white ml-1 group-hover/play:scale-110 transition-transform duration-300" 
                          fill="currentColor"
                        />
                      </div>
                    </div>
                    
                    {/* Pulse effect */}
                    <div className="absolute inset-0 w-44 h-44 rounded-full bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover/play:opacity-20 scale-110 group-hover/play:scale-125 transition-all duration-500"></div>
                  </button>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
              </>
            )}
          </div>
          
          {/* Bottom accent bar */}
          <div className="h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
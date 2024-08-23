import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoJSProps {
  videoUrl?: string;
  onReady?: (player: any) => void;
  width?: number | string;
  height?: number | string;
}

export const VideoJS: React.FC<VideoJSProps> = ({ videoUrl, onReady , width , height }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);  // Typing as 'any' to avoid TypeScript issues

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.style.width = width ? `${width}` : '100%';
      videoElement.style.height = height ? `${height}` : 'auto'; 
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        width : 300,
        height : 150,
        sources: [{
          src: videoUrl,
          type: 'application/x-mpegURL',
        }],
      }, () => {
        videojs.log('player is ready');
        if (onReady) {
          onReady(player);
        }
      }));
    } else {
      const player = playerRef.current;
      if (player) {
        player.src({
          src: videoUrl,
          type: 'application/x-mpegURL',
        });
      }
    }
  }, [videoUrl, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      {videoUrl ? (
        <div data-vjs-player>
          <div ref={videoRef} />
        </div>
      ) : (
        <div>No video available</div>
      )}
    </div>
  );
};

export default VideoJS;

"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import the default styles

const UploadComponent: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoUrl) {
      const player = videojs('video', {
        controls: true,
        autoplay: false,
        preload: 'auto',
        sources: [
          {
            src: videoUrl,
            type: 'application/x-mpegURL', // HLS MIME type
          },
        ],
      });

      return () => {
        // Dispose of the player when the component unmounts
        if (player) {
          player.dispose();
        }
      };
    }
  }, [videoUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files to upload.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      console.log('Response Data:', data);

      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
        console.log('Set Video URL:', data.videoUrl);
      } else {
        setMessage('No video URL returned');
      }
    } catch (error) {
      setMessage('Error uploading files: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        multiple
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
      {videoUrl && (
        <div>
          <h2>Uploaded Video</h2>
          <div data-vjs-player>
            <video
              id="video"
              className="video-js vjs-default-skin"
              controls
              width="600"
              height="400"
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;

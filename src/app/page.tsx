// pages/index.js

import VideoUpload from "./Components/VideoRecorder";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload and Process Video</h1>
      <VideoUpload />
    </div>
  );
}

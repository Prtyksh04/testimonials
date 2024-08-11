import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

// Set the path for ffmpeg and check if the path is valid
const ffmpegPath = ffmpegStatic || '/path/to/ffmpeg'; // Use a fallback path if necessary
ffmpeg.setFfmpegPath(ffmpegPath);

// Disable body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), 'public', 'video');

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    const videoFiles = files.file as File[] | undefined;

    if (!videoFiles || !Array.isArray(videoFiles) || videoFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Handle each file
    videoFiles.forEach((file, index) => {
      const inputPath = file.filepath;
      const videoId = new Date().getTime(); // Use a timestamp as a unique identifier
      const outputPath = path.join(uploadDir, `${videoId}`);
      const hlsPath = path.join(outputPath, 'index.m3u8');

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // Process the video with ffmpeg
      const ffmpegCommand = `ffmpeg -i "${inputPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;

      ffmpeg(inputPath)
        .output(outputPath + '/index.m3u8')
        .outputOptions([
          '-codec:v libx264',
          '-codec:a aac',
          '-hls_time 10',
          '-hls_playlist_type vod',
          '-hls_segment_filename ' + path.join(outputPath, 'segment%03d.ts'),
          '-start_number 0'
        ])
        .on('end', () => {
          fs.unlinkSync(inputPath); // Remove the original file
          res.status(200).json({
            message: 'Video converted to HLS format',
            videoUrl: `/video/${videoId}/index.m3u8`,
            videoId: videoId.toString()
          });
        })
        .on('error', (error: Error) => {
          res.status(500).json({ error: 'Error processing video', details: error.message });
        })
        .run();
    });
  });
}

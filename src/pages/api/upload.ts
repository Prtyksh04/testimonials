import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { PrismaClient } from '@prisma/client';

const ffmpegPath = ffmpegStatic || '/path/to/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), 'public', 'video');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    const videoFiles = files.file as File[] | undefined;
    const name = Array.isArray(fields.name) ? fields.name[0] : undefined;
    const email = Array.isArray(fields.email) ? fields.email[0] : undefined;
    const space = Array.isArray(fields.space) ? fields.space[0] : undefined;

    if (!videoFiles || !Array.isArray(videoFiles) || videoFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      // Process each video file
      for (const file of videoFiles) {
        const inputPath = file.filepath;
        const videoId = new Date().getTime(); 
        const outputPath = path.join(uploadDir, `${videoId}`);
        const hlsPath = path.join(outputPath, 'index.m3u8');

        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath, { recursive: true });
        }

        // Convert video to HLS format
        await new Promise<void>((resolve, reject) => {
          ffmpeg(inputPath)
            .output(hlsPath)
            .outputOptions([
              '-codec:v libx264',
              '-codec:a aac',
              '-hls_time 10',
              '-hls_playlist_type vod',
              '-hls_segment_filename ' + path.join(outputPath, 'segment%03d.ts'),
              '-start_number 0'
            ])
            .on('end', () => {
              fs.unlinkSync(inputPath); 
              resolve();
            })
            .on('error', (error: Error) => {
              reject(error);
            })
            .run();
        });
        console.log(" space : " , space);
        console.log(" email : " , email);
        console.log(" name : " , name);


        // Save data to the database
        await prisma.testimonial.create({
          data: {
            spaceName: space as string,
            starRating: 5,  
            name,
            email,
            videoUrl: `/video/${videoId}/index.m3u8`,
            type:'VIDEO'
          },
        });

        res.status(200).json({
          message: 'Video converted to HLS format and data saved',
          videoUrl: `/video/${videoId}/index.m3u8`,
          videoId: videoId.toString()
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error processing video', details: (error as Error).message });
    }
  });
}

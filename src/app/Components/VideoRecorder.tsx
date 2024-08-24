"use client";
import React, { useState, ChangeEvent } from 'react';

interface SpaceNameprops {
  space: string
}

const UploadComponent: React.FC<SpaceNameprops> = ({ space }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
    formData.append('name', name);
    formData.append('space', space)
    formData.append('email', email);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData ,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      console.log('Response Data:', data);
      setMessage('Upload successful');
    } catch (error) {
      setMessage('Error uploading files: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col  p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Video</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-200">Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-200">email <span className="text-red-500">*</span></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        multiple
        className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full px-4 py-2 rounded-lg ${uploading
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
          } text-white text-sm font-semibold`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="mt-4 text-red-400">{message}</p>}
    </div>
  );
};

export default UploadComponent;

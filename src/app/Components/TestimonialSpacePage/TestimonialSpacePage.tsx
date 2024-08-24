'use client';
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { createTestimonial } from '@/actions/testimonial';
import UploadComponent from '../VideoRecorder';

interface spaceContent {
    headerTitle: string
    customMessage: string
    questions: string[]
    spaceName: string,
}


const TestimonialPage: React.FC<spaceContent> = ({ headerTitle, customMessage, questions, spaceName }) => {
    const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
    const [starRating, setStarRating] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleOpenModal = () => setIsTextModalOpen(true);
    const handleCloseModal = () => {
        setIsTextModalOpen(false);
        setStarRating(0);
        setContent('');
        setName('');
        setEmail('');
    };

    const handleSubmitText = async (e: MouseEvent<HTMLButtonElement>) => {
        const type = 'TEXT'
        e.preventDefault();
        await createTestimonial(spaceName, starRating, content, name, email, type);
        handleCloseModal();
    };

    const handleOpenVideoModal = () => setIsVideoModalOpen(true);
    const handleCloseVideoModal = () => setIsVideoModalOpen(false);

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-4 px-12">
            <h1 className="text-5xl font-black text-center">
                {headerTitle}
            </h1>
            <p className="text-center text-gray-400">
                {customMessage}
            </p>
            <hr className='w-2/6 mt-2 border-t' />
            <ul className="list-disc list-inside mt-2 text-sm">
                {questions.map((question, index) => (
                    <li key={index}>{question || `Question ${index + 1}`}</li>
                ))}
            </ul>
            <div className="flex items-center justify-between gap-6 mt-8">
                <button
                    onClick={handleOpenVideoModal}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 flex items-center"
                >
                    Upload a video
                </button>
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 flex items-center"
                >
                    Send in text
                </button>
            </div>

            {/* Modal */}
            {isTextModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="px-6 py-2">
                            <h2 className="text-2xl font-bold mb-4 text-center">Leave a Testimonial</h2>
                            <form>
                                <div className="flex justify-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FontAwesomeIcon
                                            key={star}
                                            icon={faStar}
                                            className={`cursor-pointer text-2xl ${starRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            onMouseEnter={() => setStarRating(star)}
                                            onClick={() => setStarRating(star)}
                                        />
                                    ))}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-gray-700">Your Feedback</label>
                                    <textarea
                                        id="comment"
                                        value={content}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Name <span className="text-red-500">*</span></label>
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
                                    <label htmlFor="email" className="block text-gray-700">Your Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSubmitText}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isVideoModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
                        <button
                            onClick={handleCloseVideoModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="px-6 py-4">
                            <h2 className="text-2xl font-bold mb-4 text-center">Upload a Video Testimonial</h2>
                            <UploadComponent space={spaceName} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialPage;

'use client';
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

const TestimonialPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [permission, setPermission] = useState<boolean>(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form fields
        setRating(0);
        setComment('');
        setName('');
        setEmail('');
        setPermission(false);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        handleCloseModal();
    };

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-4 px-12">
            <h1 className="text-5xl font-black text-center">
                Thank you for using our website. Please let us know about your experience
            </h1>
            <p className="text-center text-gray-400">
                If we have talked on call, I hope it was helpful.
                <br />
                Now you can help me out by creating a quick video testimonial
            </p>
            <div className="flex items-center justify-between gap-6 mt-8">
                <button
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {/* Modal Content */}
                        <div className="px-6 py-2">
                            <h2 className="text-2xl font-bold mb-4 text-center">Leave a Testimonial</h2>
                            <form>
                                {/* Star Rating System */}
                                <div className="flex justify-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FontAwesomeIcon
                                            key={star}
                                            icon={faStar}
                                            className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            onMouseEnter={() => setRating(star)}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-gray-700">Your Feedback</label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
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
                                <div className="mb-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="permission"
                                        checked={permission}
                                        onChange={() => setPermission(!permission)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="permission" className="text-gray-700 text-sm">
                                        I give permission to use this testimonial across social channels and other marketing efforts
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSubmit}
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
        </div>
    );
};

export default TestimonialPage;

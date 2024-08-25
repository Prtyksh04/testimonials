"use client";
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { createSpace } from '@/actions/spaces';
import Link from 'next/link';
import Image from 'next/image';
import { spaces, FormData } from '@/types/types';

const DashBoard = ({ Spaces }: { Spaces: spaces[] }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [spacesUpdated, setSpacesUpdated] = useState<spaces[]>(Spaces);
    const [formData, setFormData] = useState<FormData>({
        spaceName: '',
        headerTitle: '',
        customMessage: '',
        questions: [
            'How has our product / service helped you?',
            'Who are you / what are you working on?',
            'What is the best thing about our product / service'
        ]
    });

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = value;
        setFormData(prevData => ({
            ...prevData,
            questions: newQuestions,
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const createdSpace = await createSpace(formData.spaceName, formData.headerTitle, formData.customMessage, formData.questions);
        if (createdSpace) {
            setSpacesUpdated(prev => [
                ...prev,
                createdSpace
            ]);
        }
    };

    const handleCloseModal = () => {
        setFormData({
            spaceName: '',
            headerTitle: '',
            customMessage: '',
            questions: [
                'How has our product / service helped you?',
                'Who are you / what are you working on?',
                'What is the best thing about our product / service'
            ],
        });
        setIsDarkTheme(false);
        setIsModalOpen(false);
    };

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };

    return (
        <div className="min-h-screen bg-background">
            <header className='text-white p-4 flex items-center justify-between'>
                <div>
                    <Image src="/testimonial-logo.svg" alt='Testimonial Logo' height={150} width={150} />
                </div>
                <div className='text-white text-md'>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </header>
            <main className="p-6 ml-14 flex flex-col">
                <div className="flex justify-between items-center mt-20 mb-10">
                    <h1 className="text-5xl font-bold text-white">Overview</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-custom-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-white">Video</h3>
                        <p>Total number of videos of the user account</p>
                    </div>
                    <div className="bg-custom-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-white">Text</h3>
                        <p>Total number of Text of the user account</p>
                    </div>
                    <div className="bg-custom-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-white">Audio</h3>
                        <p>Total number of Audio of the user account</p>
                    </div>
                </div>
            </main>
            <div className="p-6">
                <hr className="w-1/2 mx-auto border-t border-gray-500" />
            </div>
            <main className="pl-6 pr-6 pb-6 ml-14">
                <div className="flex justify-between items-center mt-20 mb-8">
                    <h1 className="text-5xl font-bold text-white">Spaces</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 flex items-center"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2 text-lg" />
                        Create a Space
                    </button>
                </div>
                {spacesUpdated.length === 0 ? (
                    <div className="flex items-center justify-center flex-col">
                        <Image src="/tree-dashboard.svg" alt='No Space Available' height={300} width={300} />
                        <p className='text-lg text-white mt-4'>No Space available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
                        {spacesUpdated.map((space: spaces) => (
                            <Link key={space.id} href={`/products/${space.spaceName}`}>
                                <div className="bg-[#27292c] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
                                    <h2 className="text-xl font-semibold text-white mb-4">{space.spaceName}</h2>
                                    <div className='flex gap-4'>
                                        <p className='text-sm text-gray-400'>Video : 2</p>
                                        <p className='text-sm text-gray-400'>Text : 2</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg flex flex-col w-full max-w-4xl h-auto max-h-screen overflow-hidden">
                        <button
                            onClick={handleCloseModal}
                            className={`absolute top-4 right-4 z-20 ${isDarkTheme ? 'text-slate-300' : 'text-gray-600'}`}
                        >
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="flex-1 flex overflow-auto">
                            <div className={`flex w-full h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <div className="w-1/2 p-6 border-r border-gray-300 overflow-auto min-h-[500px] z-10 relative">
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                                    <h2 className="text-2xl font-bold mb-4 text-live">Live Preview</h2>
                                    <div className={`p-6 rounded-lg shadow-md border border-gray-200 relative z-10 ${isDarkTheme ? 'bg-background text-white' : 'bg-white'}`}>
                                        <div className='flex items-center justify-center flex-col mb-2'>
                                            <h3 className="text-3xl font-bold mb-4 text-center">{formData.headerTitle || 'Header Title'}</h3>
                                            <p className="text-lg text-center">{formData.customMessage || 'Your custom message here...'}</p>
                                        </div>
                                        <h4 className='text-md pt-4'>Questions</h4>
                                        <hr className='w-2/6 mt-2 border-t' />
                                        <ul className="list-disc list-inside mt-2 text-sm">
                                            {formData.questions.map((question, index) => (
                                                <li key={index}>{question || `Question ${index + 1}`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-1/2 p-6 overflow-auto min-h-[500px]">
                                    <div className="relative flex flex-col items-center justify-center h-full">
                                        <h2 className="text-2xl font-bold mb-4 text-center">Create Space</h2>
                                        <form className="w-full max-w-lg">
                                            <div className="mb-4">
                                                <label htmlFor="spaceName" className="block text-gray-700 mb-2">Space Name</label>
                                                <input
                                                    type="text"
                                                    id="spaceName"
                                                    name="spaceName"
                                                    value={formData.spaceName}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="headerTitle" className="block text-gray-700 mb-2">Header Title</label>
                                                <input
                                                    type="text"
                                                    id="headerTitle"
                                                    name="headerTitle"
                                                    value={formData.headerTitle}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="customMessage" className="block text-gray-700 mb-2">Custom Message</label>
                                                <textarea
                                                    id="customMessage"
                                                    name="customMessage"
                                                    value={formData.customMessage}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="text-lg font-semibold mb-2">Questions</h4>
                                                {formData.questions.map((question, index) => (
                                                    <div key={index} className="mb-2">
                                                        <label className="block text-gray-700 mb-1">Question {index + 1}</label>
                                                        <input
                                                            type="text"
                                                            value={question}
                                                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                            className="w-full p-3 border rounded-md"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            >
                                                Create Space
                                            </button>
                                        </form>
                                        <button
                                            onClick={toggleTheme}
                                            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="mr-2" />
                                            Toggle Theme
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashBoard;

'use client';
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface FormData {
    spaceName: string;
    headerTitle: string;
    customMessage: string;
    questions: string[];
}

const DashBoard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false); // Add theme state

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            questions: newQuestions,
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        setIsModalOpen(false);
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
            ], // Reset questions
        });
        setIsDarkTheme(false); // Reset theme
        setIsModalOpen(false);
    };

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };

    return (
        <div className="min-h-screen bg-background">
            <header>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard Page" />
                <link rel="icon" href="/favicon.ico" />
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
                <div className="flex items-center justify-center">
                    <img src="/tree-dashboard.svg" alt="Tree Image" width={300} height={300} />
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg flex flex-col w-full max-w-4xl h-auto max-h-screen overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-20"
                        >
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        {/* Modal Content */}
                        <div className="flex-1 flex overflow-auto">
                            <div className={`flex w-full h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                {/* Live Preview */}
                                <div className="w-1/2 p-6 border-r border-gray-300 overflow-auto min-h-[500px] z-10 relative">
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                                    <h2 className="text-2xl font-bold mb-4 text-live">Live Preview</h2>
                                    <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 relative z-10 ${isDarkTheme ? 'bg-gray-800 text-gray-100 border-gray-700' : ''}`}>
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
                                        <div className="mt-6 flex flex-col space-y-4">
                                            <button className="w-full bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300">
                                                Upload a Video
                                            </button>
                                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                                                Send in Text
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Form */}
                                <div className="w-1/2 p-6 overflow-auto">
                                    <div className='flex items-center flex-col justify-between'>
                                        <h2 className="text-2xl font-medium mb-4 text-gray-800 text-center">Create a New Space</h2>
                                        <p className="mb-6 text-gray-600 text-xs text-center">After the Space is created, it will generate a dedicated page for collecting testimonials.</p>
                                    </div>
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="spaceName" className="block text-gray-700 font-medium text-xs">Space Name (required)</label>
                                            <input
                                                type="text"
                                                id="spaceName"
                                                name="spaceName"
                                                value={formData.spaceName}
                                                onChange={handleChange}
                                                autoComplete='off'
                                                required
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className='text-xs text-gray-800'>
                                            <p>
                                                <span>Public URL is : </span>
                                                testimonial/{formData.spaceName}
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="headerTitle" className="block text-gray-700 font-medium text-xs">Header Title</label>
                                            <input
                                                type="text"
                                                id="headerTitle"
                                                name="headerTitle"
                                                value={formData.headerTitle}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="customMessage" className="block text-gray-700 font-medium text-xs">Custom Message</label>
                                            <textarea
                                                id="customMessage"
                                                name="customMessage"
                                                value={formData.customMessage}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <h4 className='text-md'>Questions</h4>
                                            <hr className='w-2/6 mt-2 border-t' />
                                            {formData.questions.map((question, index) => (
                                                <div key={index} className="flex items-center mb-4">
                                                    <input
                                                        type="text"
                                                        value={question}
                                                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Create Space
                                        </button>
                                    </form>
                                    <button
                                        onClick={toggleTheme}
                                        className={`mt-4 flex items-center justify-center px-6 py-2 rounded-lg border border-gray-300 bg-white shadow-md hover:bg-gray-200`}
                                    >
                                        <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} className="mr-2" />
                                    </button>
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

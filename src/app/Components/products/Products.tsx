"use client";
import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { FaTrash, FaSearch, FaVideo, FaFileAlt, FaSyncAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { getSpaceContent , editSpaceContent } from '@/actions/spaces';
import VideoPlayer from '../VideoPlayer';
import { FormData ,spaces , SpacePageProps , Testimonial} from '@/types/types';

const SpacePage: React.FC<SpacePageProps> = ({ space , headerTitle , questions,customMessage }) => {
    console.log("props Space : ", space);
    const url = `http://localhost:4000/${space}`
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [spacesUpdated, setSpacesUpdated] = useState<spaces[]>([]);
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState<number | null>(null);
    const [testimonial, setTestimonials] = useState<Testimonial[]>([]);
    const [liked, setLiked] = useState(Array(testimonial.length).fill(false));
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const toggleMenu = (index: number) => {
        setMenuVisible(prev => prev === index ? null : index);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(null);
        }
    };

    useEffect(() => {
        const fetchSpaceContent = async () => {
            const response = await getSpaceContent(space);
            setFormData((prevData) => ({
                ...prevData,
                spaceName: space || "",
                headerTitle : response.headerTitle,
                customMessage: response.customMessage,
                questions : response.questions,
            }));
        }

        fetchSpaceContent();
    },[isModalOpen]);


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchTestimonials = useCallback(async () => {
        try {
            const response = await fetch(`/api/testimonials?space=${space}`, { method: 'GET' });
            const data: Testimonial[] = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error Fetching Testimonials:', error);
        }
    }, [space]);

    useEffect(() => {
        fetchTestimonials();
    }, [space]);

    const toggleLike = (index: number) => {
        const updatedLikes = [...liked];
        updatedLikes[index] = !updatedLikes[index];
        setLiked(updatedLikes);
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
    const handleSubmit = async () => {
        const editedSpace = await editSpaceContent(formData.spaceName, formData.headerTitle, formData.customMessage, formData.questions);
        if (editedSpace) {
            setSpacesUpdated((prev) => [
                ...prev,
                editedSpace
            ]);
        }
    }

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };


    return (
        <div className="min-h-screen bg-background">
            <header className='text-white p-4 flex items-center justify-between'>
                <div>
                    <img src="/testimonial-logo.svg" alt="testimonialLogo" width={150} height={150} />
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
            <hr className="border-gray-700 mb-6" />
            <header className="px-8 py-6 relative">
                <div className="flex flex-col">
                    <h1 className="text-white text-4xl font-bold mb-4">{space}</h1>
                    <div className="flex items-center justify-between relative">
                        <p className="text-gray-400 text-sm">
                            Space public URL:{" "}
                            <a
                                href={url}
                                className="text-gray-400 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                http://localhost:4000/{space}
                            </a>
                        </p>
                        <button
                            onClick={() => { setIsModalOpen(true) }}
                            className="ml-6 flex items-center bg-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-300"
                        >
                            Edit Space
                        </button>
                    </div>
                </div>
            </header>
            <hr className="border-gray-700 mb-6" />
            <main className="relative flex">
                {/* Sidebar */}
                <aside className="w-1/4 bg-background text-white p-8">
                    <div className='mb-6'>
                        <h2 className="text-2xl font-bold mb-6">INBOX</h2>
                        <ul className="space-y-4 list-disc pl-6">
                            {['All', 'Video', 'Text', 'Archived', 'Liked'].map((item) => (
                                <li key={item} className="relative">
                                    <button
                                        className={`w-full text-left text-white py-1 px-5 rounded-lg ${activeButton === item ? 'bg-inbox-hover' : 'hover:bg-inbox-hover'
                                            }`}
                                        onClick={() => handleButtonClick(item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='mb-6'>
                        <h2 className="text-2xl font-bold mb-6">Embeds & Metrics</h2>
                        <ul className="space-y-4 list-disc pl-6">
                            {['Wall of Love', 'Single testimonial', 'Collecting Widget', 'Metrics'].map((item) => (
                                <li key={item} className="relative">
                                    <button
                                        className={`w-full text-left text-white py-1 px-5 rounded-lg ${activeButton === item ? 'bg-inbox-hover' : 'hover:bg-inbox-hover'
                                            }`}
                                        onClick={() => handleButtonClick(item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6">LINKS</h2>
                        <ul className="space-y-4 list-disc pl-6">
                            {['Public Landing Page', 'Wall of Love Page'].map((item) => (
                                <li key={item} className="relative">
                                    <button
                                        className={`w-full text-left text-white py-1 px-5 rounded-lg ${activeButton === item ? 'bg-inbox-hover' : 'hover:bg-inbox-hover'
                                            }`}
                                        onClick={() => handleButtonClick(item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                {/* Main content screen */}
                <div className="w-3/4 p-8 relative">
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center bg-background text-white py-3 px-6 rounded-lg w-3/4 relative'>
                            <FaSearch className="text-gray-400 mr-3" />
                            <input
                                type="text"
                                className="bg-background text-white py-2 px-4 rounded-lg w-full outline-none placeholder-gray-400"
                                placeholder="Search by name, email, or testimonial keyword"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                className="bg-background text-gray-200 px-3 py-2 rounded-lg hover:bg-gray-800 mb-4"
                                onClick={fetchTestimonials}
                            >
                                <FaSyncAlt className="text-gray-600" />
                            </button>
                            <button
                                className="bg-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-300"
                                onClick={toggleDropdown}
                            >
                                Options
                            </button>
                        </div>
                    </div>
                    <Transition
                        show={isDropdownOpen}
                        enter="transition-opacity duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-75"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            ref={dropdownRef}
                            className="absolute top-16 right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-56 z-50"
                        >
                            <button
                                className="w-full px-6 py-3 text-left hover:bg-gray-200 rounded-lg"
                            >
                                Add a Video
                            </button>
                            <button
                                className="w-full px-6 py-3 text-left hover:bg-gray-200 rounded-lg"
                            >
                                Add a Text
                            </button>
                        </div>
                    </Transition>
                    {testimonial.length === 0 ? (
                        <div className='flex flex-col items-center justify-center mt-6'>
                            <img src="/tree-dashboard.svg" alt="Tree Image" width={500} height={375} />
                            <p className="text-white text-lg mt-4">No testimonial yet</p>
                        </div>
                    ) : (
                        <div className='flex flex-col space-y-6 mt-6'>
                            {testimonial.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-[#27292c] p-6 rounded-lg relative flex flex-col"
                                >
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <button
                                            className="p-2 bg-[#27292c] text-white rounded-full"
                                            onClick={() => toggleLike(index)}
                                        >
                                            {liked[index] ? (
                                                <FaHeart className="w-4 h-4 text-red-500" />
                                            ) : (
                                                <FaRegHeart className="w-4 h-4 text-white" />
                                            )}
                                        </button>
                                        <button
                                            className="p-2 bg-gray-500 text-white rounded-full"
                                            onClick={() => toggleMenu(index)}
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        {testimonial.type === 'VIDEO' ? (
                                            <FaVideo className="text-blue-500 mr-2" />
                                        ) : (
                                            <FaFileAlt className="text-amber-100 mr-2" />
                                        )}
                                        <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">{testimonial.email}</p>
                                    {
                                        testimonial.type === "TEXT" && (
                                            <p className="text-white mt-4">{testimonial.content}</p>
                                        )
                                    }
                                    {
                                        testimonial.type === "VIDEO" && (
                                            <VideoPlayer videoUrl={testimonial.videoUrl} width={300} height={150} />
                                        )
                                    }
                                    <div className='flex items-center justify-between mt-4'>
                                        <p className="text-gray-400 text-xs">{new Date(testimonial.submittedAt).toLocaleString()}</p>
                                        <div className="flex">
                                            <span className="text-yellow-400 text-xl">
                                                {"★".repeat(testimonial.starRating)}
                                            </span>
                                            <span className="text-gray-600 text-xl">
                                                {"★".repeat(5 - testimonial.starRating)}
                                            </span>
                                        </div>
                                    </div>
                                    {menuVisible === index && (
                                        <div
                                            ref={menuRef}
                                            className="absolute top-16 right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-56 z-50"
                                        >
                                            <button
                                                className="w-full px-6 py-3 text-left hover:bg-gray-200 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="w-full px-6 py-3 text-left hover:bg-gray-200 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
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
                                        <div className="w-1/2 p-6 overflow-auto">
                                            <div className='flex items-center flex-col justify-between'>
                                                <h2 className={`text-2xl font-medium mb-4text-center ${isDarkTheme ? 'text-slate-300' : 'text-gray-800'}`}>Edit Space</h2>
                                                <p className={`mb-6 text-xs text-center ${isDarkTheme ? 'text-slate-300' : 'text-gray-600'}`}>After the Space is Edited, it will show a Changes on the Dedicated Page for testimonial</p>
                                            </div>
                                            <form>
                                                <div className="mb-4">
                                                    <label htmlFor="spaceName" className={`blockfont-medium text-xs ${isDarkTheme ? 'text-slate-300' : 'text-gray-700'}`}>Space Name (required)</label>
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
                                                <div className={`text-sm ${isDarkTheme ? 'text-slate-400' : 'text-gray-800'} mb-4`}>
                                                    <p>
                                                        <span>Public URL is : </span>
                                                        testimonial/{formData.spaceName}
                                                    </p>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="headerTitle" className={`block font-medium text-xs ${isDarkTheme ? 'text-slate-300' : 'text-gray-700'}`}>Header Title</label>
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
                                                    <label htmlFor="customMessage" className={`block ${isDarkTheme ? 'text-slate-300' : 'text-gray-700'} font-medium text-xs`}>Custom Message</label>
                                                    <textarea
                                                        id="customMessage"
                                                        name="customMessage"
                                                        value={formData.customMessage}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <h4 className={`text-md ${isDarkTheme ? 'text-slate-300' : 'text-gray-700'}`}>Questions</h4>
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
            </main>
        </div>
    );
};

export default SpacePage;

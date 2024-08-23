"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaTrash, FaSearch, FaVideo, FaFileAlt, FaSyncAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import VideoPlayer from '../VideoPlayer';

interface Testimonial {
    type: 'VIDEO' | 'TEXT';
    starRating: number;
    name: string;
    email: string;
    content?: string;
    submittedAt: Date;
    videoUrl?: string
}
interface SpacePageProps {
    space: string
}

const SpacePage: React.FC<SpacePageProps> = ({ space }) => {
    console.log("props Space : ", space);
    const url = `http://localhost:4000/${space}`
    const [activeButton, setActiveButton] = useState<string | null>(null);
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
                                            <VideoPlayer videoUrl={testimonial.videoUrl} width={600} height={400}/>
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
                </div>
            </main>
        </div>
    );
};

export default SpacePage;

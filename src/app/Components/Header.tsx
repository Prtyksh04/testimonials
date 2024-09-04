'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useSession } from "next-auth/react"


const Header = () => {

  const [Session, setSession] = useState<boolean>(false);
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setSession(true);
    }
  }, [status]);

  return (
    <header className="flex justify-between text-white p-4 items-center">
      <div>
        <Image src="/testimonial-logo.svg" alt="testimonialLogo" width={150} height={150} />
      </div>
      <div className="text-white text-md">
        {!session ? (
          <div>
            <button
              onClick={() => { window.location.href = "/auth/signin" }}
              className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => { signOut() }}
              className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

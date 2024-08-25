import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserButton, SignInButton } from '@clerk/nextjs';
import Image from 'next/image';

const Header = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className='text-white p-4 flex items-center justify-between'>
      <div>
        <Image src="/testimonial-logo.svg" alt='' height={150} width={150} />
      </div>
      {isMounted && (user ? <UserButton /> : <SignInButton />)}
    </header>
  );
};

export default Header;

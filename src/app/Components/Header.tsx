import Image from 'next/image';

const Header = () => {

  return (
    <header className='text-white p-4 flex items-center justify-between'>
      <div>
        <Image src="/testimonial-logo.svg" alt='' height={150} width={150} />
      </div>
    </header>
  );
};

export default Header;

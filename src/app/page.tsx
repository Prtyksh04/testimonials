'use client';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import Header from './Components/Header';

export default function Home() {

  const [Session, setSession] = useState<boolean>(false);
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setSession(true);
    }
  }, [status]);


  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mt-24 p-4">
        <section className="mt-4">
          <div className="flex items-center justify-between flex-col max-w-4xl mx-auto">
            <h1 className="text-white text-5xl font-bold text-center">
              Get testimonials from your customers with ease
            </h1>
            <h3 className="text-gray-500 text-center mt-8">
              Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.
            </h3>
            <button
              onClick={() => {
                router.push('/dashboard');
              }}
              className="rounded-lg bg-buttoColor p-4 text-white text-lg font-semibold mt-4"
            >
              Try FREE now
            </button>
            <div className='mt-6 max-w-4xl mx-auto p-4'>
              <div className='relative aspect-w-16 aspect-h-9'>
                <video
                  src="/homePage.mp4"
                  controls
                  className='w-full h-full object-cover rounded-lg shadow-lg'
                  title="Testing Video"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="mt-8 bg-gray-700 border-t-0 border-b-2 border-gray-800" />

        <section className="mt-4">
          <div className="flex items-center justify-between flex-col max-w-4xl mx-auto">
            <h1 className="text-white text-5xl font-bold text-center">
              Add testimonials to your website with no coding!
            </h1>
            <h3 className="text-gray-500 text-center mt-8">
              Copy and paste our HTML code to add the Wall Of Love (👉 full version) to your website. We support any no-code platform (Webflow, WordPress, you name it!)
            </h3>
          </div>
          <div className="mt-6 p-4 bg-background text-white rounded-lg shadow-md flex items-center justify-center flex-col">
            <h2 className="text-xl font-semibold mb-4">Example Code Snippet</h2>
            <pre className="overflow-x-auto bg-gray-600 rounded-lg border-buttoColor border-2">
              <code className="language-html">
                {`  <iframe
    src='testimonials-bf1h.vercel.app/test'
    width="100%"
    height="600px"
    allowFullScreen
    title="Example Iframe"
    className="border-none"
    style={{ borderRadius: '8px', overflow: 'hidden' }}>
  </iframe>`}
              </code>
            </pre>
          </div>
        </section>

        <hr className="mt-8 bg-gray-700 border-t-0 border-b-2 border-gray-800" />

        <section className="mt-4">
          <div className="flex items-center justify-between flex-col max-w-4xl mx-auto">
            <h1 className="text-white text-5xl font-bold text-center">
              Collect and display testimonials all in one solution
            </h1>
          </div>
          <div className="mt-20 ml-20 flex items-center justify-around mr-20 h-96">
            <div className="w-96 flex space-y-4 flex-col">
              <h2 className="text-buttoColor text-xl">Quick to setup</h2>
              <h1 className="text-white text-3xl font-bold">A dedicated landing page</h1>
              <h3 className="text-gray-500 text-xl">
                Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes.
              </h3>
              <button className="rounded-lg bg-buttoColor p-4 text-white text-lg font-semibold">
                Try FREE now
              </button>
            </div>
            <div className="w-96">
              <Image src="/landing-page.png" alt="" height={600} width={600} />
            </div>
          </div>
          <div className="mt-20 ml-20 flex items-center justify-around mr-20 h-96">
            <div className="w-96 mt-12">
              <Image src="/easytomanage.png" alt="" height={600} width={600} />
            </div>
            <div className="w-96 flex space-y-4 flex-col">
              <h2 className="text-buttoColor text-xl">Easy to manage</h2>
              <h1 className="text-white text-3xl font-bold">A dashboard to manage all testimonials</h1>
              <h3 className="text-gray-500 text-xl">
                You will have a simple &amp; clean dashboard to manage all testimonials in one place. It&apos;s like your email inbox, but it&apos;s designed for your social proof!
              </h3>
              <button className="rounded-lg bg-buttoColor p-4 text-white text-lg font-semibold">
                Try FREE now
              </button>
            </div>
          </div>
        </section>
      </main>

      <hr className="mt-8 bg-gray-700 border-t-0 border-b-2 border-gray-800" />

      <footer className="bg-background text-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-buttoColor">Pratyaksh</h2>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Follow Me</h3>
              <div className="mt-2 flex space-x-4">
                <a
                  href="https://github.com/prtyksh04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/pratyaksh-saini-24004825b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://x.com/PratyakshSaini5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-gray-700 pt-4">
            <p>&copy; {new Date().getFullYear()} Pratyaksh. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
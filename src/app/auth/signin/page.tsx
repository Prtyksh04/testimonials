'use client'
import { signIn, useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (session?.user) {
      window.location.href = "/dashboard";
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-buttoColor to-purple-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="text-gray-500 text-lg">Loading...</div>
        ) : !session?.user ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">Sign in to access your dashboard and features.</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300"
              onClick={() => signIn('google')}
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          // Placeholder text while redirecting
          <div className="text-gray-500 text-lg">Redirecting to dashboard...</div>
        )}
      </div>
    </div>
  );
}

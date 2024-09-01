'use client'
import { signIn, useSession ,signOut} from "next-auth/react"

export default function SignIn() {
  const session = useSession();
  return (
    <div>
      {session.data?.user && <button className="bg-purple-600 text-white hover:bg-purple-700 p-2 m-2 rounded-lg" onClick={() => signOut()}>Logout</button>}
      {!session.data?.user && <button className="p-2 m-2 bg-blue-400 rounded-lg" onClick={() => signIn('google')}>Sign in</button>}
    </div>
  )
}
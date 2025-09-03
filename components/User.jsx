"use client";

import { useSession, signOut } from 'next-auth/react'

export default function User () {
    const { data: session } = useSession()
  return (
    <div>
        {JSON.stringify(session)}<br />
        <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

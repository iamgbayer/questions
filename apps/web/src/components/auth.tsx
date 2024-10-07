import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

type Props = {
  page: 'signin' | 'signup'
}

export function Auth({ page = 'signin' }: Props) {
  const router = useRouter()
  const { signUp, signIn } = useAuth()

  const signInWithGoogle = async () => {
    await signInWithGoogle()
  }

  return (
    <div className="container flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        {page === 'signin' ? 'Welcome!' : 'Sign up'}
      </h1>

      <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
    </div>
  )
}

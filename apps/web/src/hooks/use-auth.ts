import { supabase } from '@/lib/supabase/client'
import { HttpClient } from '@/services/http-client'
import { Signup } from '@/services/signup'
import { useEffect, useState } from 'react'

export function useAuth() {
  const httpClient = new HttpClient()
  const [isSignedIn, setIsSignedIn] = useState(false)

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_URL
      }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signUp = async () => {}

  const signInWithPassword = async () => {}

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await new Signup(httpClient).execute({
          email: session?.user.email ?? '',
          providerId: session?.user.id ?? ''
        })
      }

      if(session) {
        return setIsSignedIn(true)
      }

      return setIsSignedIn(false)
    })
  }, [])

  return {
    signInWithGoogle,
    signInWithPassword,
    signUp,
    isSignedIn,
    signOut
  }
}

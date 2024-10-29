import { supabase } from '@/lib/supabase/client'
import { HttpClient } from '@/services/http-client'
import { Onboard } from '@/services/onboard'
import { useEffect, useState } from 'react'

export function useAuth() {
  const httpClient = new HttpClient()
  const [isSignedIn, setIsSignedIn] = useState(false)

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle', process.env.NEXT_PUBLIC_URL)
    
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

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('session', session)
        await new Onboard(httpClient).execute({
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
    isSignedIn,
    signOut
  }
}

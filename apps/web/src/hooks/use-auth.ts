import { supabase } from '@/lib/supabase/client'
import { HttpClient } from '@/services/http-client'
import { Onboard } from '@/services/onboard'
import { useEffect, useState } from 'react'

export function useAuth() {
  const httpClient = new HttpClient()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await new Onboard(httpClient).execute({
          photoUrl: session?.user.user_metadata.picture ?? '',
          email: session?.user.email ?? '',
          providerId: session?.user.id ?? ''
        })
      }

      if(session) {
        return setIsAuthenticated(true)
      }

      return setIsAuthenticated(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    signInWithGoogle,
    isAuthenticated,
    signOut
  }
}

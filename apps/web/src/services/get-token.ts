import { supabase } from '@/lib/supabase/client'

export class GetToken {
  public execute() {
    return new Promise<string | undefined>((resolve, reject) => {
      supabase.auth.onAuthStateChange((_, session) => {
        return resolve(session?.access_token)
      })
    });
  }
}

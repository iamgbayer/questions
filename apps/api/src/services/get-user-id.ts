import { db } from '@/lib/db'
import { supabase } from '@/lib/supabase'
import { Request } from 'express'

export const getUserId = async (
  req: Request,
) => {
  const token = req.headers.authorization

  if (!token) {
    return null
  }

  try {
    const payload = await supabase.auth.getUser(token)

    if (!payload.data.user) {
      return null
    }

    const user = await db
      .selectFrom('users')
      .select(['id'])
      .where('provider_id', '=', payload.data.user.id)
      .executeTakeFirst()

    if (!user) {
      return null
    }

    return user.id
  } catch (error) {
    return null
  }
}


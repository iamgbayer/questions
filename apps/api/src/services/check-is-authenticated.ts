import { supabase } from '@/lib/supabase'
import { Request, Response } from 'express'

export const checkIsAuthenticated = async (
  req: Request,
  res: Response
) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const payload = await supabase.auth.getUser(token)

    if (!payload.data.user) {
      return res.status(401).json({ error: 'User not found' })
    }

    return payload.data.user.id
  } catch (error) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
}


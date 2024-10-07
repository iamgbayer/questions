import { db } from '@/lib/db';

export const signup = async (req, res) => {
  const { email, providerId } = req.body;

  const user = await db
    .insertInto('users')
    .values({
      email,
      username: email.split('@')[0],
      provider_id: providerId,
    })
    .onConflict((oc) => 
      oc.column('email').doUpdateSet({
        provider_id: providerId,
      })
    )
    .returning(['id'])
    .executeTakeFirst();

  return res.json(user);
}

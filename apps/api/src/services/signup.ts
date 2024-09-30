import { prisma } from '@/lib/prisma'

export const signup = async (req: Request, res: Response) => {
  const { email, provider, providerId } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if (provider !== user?.provider) {
    throw new Error('User already exists with different provider')
  }

  return prisma.user.create({
    data: {
      email,
      username: email,
      providerId,
      provider,
    }
  })
}

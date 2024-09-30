import { useRouter } from 'next/router'

export const useLogout = () => {
  const router = useRouter()

  return {
    logout: async () => {
      router.push('/signin')
    }
  }
}

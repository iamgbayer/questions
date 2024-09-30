import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/use-logout'
import { BookmarkIcon } from '@radix-ui/react-icons'
import { LogOut, ScrollText, Settings, Terminal } from 'lucide-react'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

export const Sidebar = ({ children }: Props) => {
  const router = useRouter()
  const { logout } = useLogout()

  const getActivePage = (page: string) => {
    const path = router.pathname

    if (path === page) {
      return 'secondary'
    }

    return 'ghost'
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="w-64">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Discover
            </h2>
            <div className="space-y-1">
              <Button
                variant={getActivePage('/practice')}
                className="w-full justify-start"
                onClick={() => router.push('/practice')}
              >
                <Terminal size={16} strokeWidth={1} className="mr-2" />
                Practice
              </Button>

              <Button
                variant={getActivePage('/questions')}
                className="w-full justify-start"
                onClick={() => router.push('/questions')}
              >
                <BookmarkIcon className="mr-2" />
                Questions
              </Button>

              <Button
                variant={getActivePage('/lists')}
                className="w-full justify-start"
                onClick={() => router.push('/lists')}
              >
                <ScrollText size={16} strokeWidth={1} className="mr-2" />
                Lists
              </Button>

              <Button
                variant={getActivePage('/settings')}
                className="w-full justify-start"
              >
                <Settings size={16} strokeWidth={1} className="mr-2" />
                Settings
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={logout}
              >
                <LogOut size={16} strokeWidth={1} className="mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-l">
        <div className="container mt-6">{children}</div>
      </div>
    </div>
  )
}

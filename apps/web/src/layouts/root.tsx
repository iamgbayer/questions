import { QueryClient, QueryClientProvider } from 'react-query'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

const client = new QueryClient()

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}

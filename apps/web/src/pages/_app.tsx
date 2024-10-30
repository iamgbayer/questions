import { Header } from '@/components/header'
import { Root } from '@/layouts/root'
import { SignInDialogProvider } from '@/providers/signin-dialog'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import ReactGA from 'react-ga4'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!)

  return (
    <Root>
      <SignInDialogProvider>
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </SignInDialogProvider>
    </Root>
  )
}

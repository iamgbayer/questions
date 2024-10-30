import { createContext, useState } from "react"

type SignInDialogContextType = {
  isSignInDialogOpen: boolean
  setIsSignInDialogOpen: (isSignInDialogOpen: boolean) => void
}

export const SignInDialogContext = createContext<SignInDialogContextType | undefined>(undefined)

export function SignInDialogProvider({ children }: { children: React.ReactNode }) {
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

  return <SignInDialogContext.Provider value={{ isSignInDialogOpen, setIsSignInDialogOpen }}>{children}</SignInDialogContext.Provider>
}

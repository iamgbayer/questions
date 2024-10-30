import { useContext } from "react"
import { SignInDialogContext } from "@/providers/signin-dialog"

export function useSignInDialog() {
  const context = useContext(SignInDialogContext)

  if (!context) {
    throw new Error('useSignInDialog must be used within a SignInDialogProvider')
  }

  return context
}
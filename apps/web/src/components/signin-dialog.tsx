import { useAuth } from "@/hooks/use-auth";
import { GoogleIcon } from "./google-icon";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useSignInDialog } from "@/hooks/use-signin-dialog";

export function SignInDialog() {
  const { signInWithGoogle } = useAuth()
  const { isSignInDialogOpen, setIsSignInDialogOpen } = useSignInDialog()

  const handleSignIn = async () => {
    await signInWithGoogle()
  }

  return (
    <Dialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
          <DialogDescription>
            Please sign in with your Google account to access the quiz.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={handleSignIn} className="flex items-center gap-2">
            <GoogleIcon />

            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSignInDialog } from "@/hooks/use-signin-dialog";
import { useRouter } from "next/router";

export function Header() {
  const { isSignedIn, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
  }

  const { setIsSignInDialogOpen } = useSignInDialog()

  return <header className="z-50 border-b bg-white shadow-sm py-4 px-8 fixed w-full">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">React Questions</h1>

      <div className="flex items-center gap-4">
        <span className="text-muted-foreground cursor-pointer">Home</span>
        <span className="text-muted-foreground cursor-pointer">Ranking</span>

        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-10 h-10 rounded-full">
                GB
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/profile/gui')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="text-muted-foreground cursor-pointer" onClick={() => setIsSignInDialogOpen(true)}>Sign In</span>
        )}
      </div>
    </div>
  </header>
}
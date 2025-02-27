import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NavBar() {
  return (
<header className="border-b w-full">
      <div className="p-5 container m-auto flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            Coderacer
          </Link>

        <nav className="flex items-center space-x-4">
          <Button>Sign In</Button>
          <Button variant={"outline"}>Create an Account</Button>
        </nav>
      </div>
    </header>
  )
}


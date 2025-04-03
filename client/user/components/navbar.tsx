"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";

function Navbar({dp, name}: {dp: string, name: string}) {
  const nav = useRouter();

  
  return (
    <header className="border-b w-full">
      <div className="p-5 container m-auto flex items-center justify-between h-16">
        <div className="p-5 flex items-center justify-start gap-12 h-16">
          <Link href="/" className="text-2xl font-bold">
            Coderacer
          </Link>
          <ul className="flex items-center space-x-4">
            <Button variant={"ghost"}>
              <Link href="/problems" className="text-sm font-medium">
                Problems
              </Link>
            </Button>
            <Button variant={"ghost"}>
              <Link href="/roadmaps" className="text-sm font-medium">
                Roadmaps
              </Link>
            </Button>
          </ul>
        </div>

        <nav className="flex items-center space-x-4">
          {(typeof window !== 'undefined' && localStorage.getItem("isAuth") != "Yes") ? (
            <>
              <Button onClick={() => nav.push("/login")}>Sign In</Button>
              <Button variant={"outline"}>Create an Account</Button>
            </>
          ) : (
            <Avatar>
              <AvatarImage src={dp} />
              <AvatarFallback>{name?.split(" ").map((e) => e[0]).join("").toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

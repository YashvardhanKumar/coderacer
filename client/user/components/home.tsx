"use client";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProblemList } from "@/components/problem-list";
import Navbar from "@/components/navbar";
import { Suspense, useEffect, useState } from "react";
import { getCurUser, getUserById } from "@/lib/api/user";


export const HomePage = () => {
  const [curUser,setCurUser] = useState();
  useEffect(() => {
    getCurUser().then(user => setCurUser(user));
  }, []);
  return (
      <div className="flex flex-col min-h-screen w-screen">
        <Navbar dp={""} name={"Yashvardhan Kumar"} />
        <main className="container p-5 m-auto flex-1 py-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Problem Set</h1>
              <div className="flex items-center space-x-2">
                <Input className="w-64" placeholder="Search problems..." />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Difficulty <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Easy</DropdownMenuItem>
                    <DropdownMenuItem>Medium</DropdownMenuItem>
                    <DropdownMenuItem>Hard</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <ProblemList />
          </div>
        </main>
        <footer className="border-t py-4">
          <div className="container text-center text-sm text-muted-foreground">
            © 2023 LeetClone. All rights reserved.
          </div>
        </footer>
      </div>
  );
};

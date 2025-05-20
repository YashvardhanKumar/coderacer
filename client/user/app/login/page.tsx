"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { MouseEvent, MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string({ message: "Required" }).email(),
  password: z.string({ message: "Required" }),
});
export default function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const nav = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  async function handleGithubButton() {
    try {
      setIsConnecting(true);
      const userId = uuidv4();
      const res = await axios.post("http://api.localhost/auth/github", {
        userId,
        role: "user",
      });

      const uri = res.data.url;
      var ref = window.open(uri, "_blank");
      const pollTimer = window.setInterval(() => {
        if (ref?.closed !== false) {
          window.clearInterval(pollTimer);
          handleWindowClosed(userId);
        }
      }, 200);
    } catch (e: any) {
      setIsConnecting(false);
      alert(e.message);
    }

    // Redirect to Github OAuth
  }

  const handleWindowClosed = async (userId: string) => {
    try {
      const response = await axios.post(
        `http://api.localhost/auth/github/credentials`,
        {
          userId,
        },{
          withCredentials: true,
        }
      );
      const credentials = response.data;
      console.log(credentials);
      
      if (credentials) {
        setIsConnecting(false);
        setIsConnected(true);
        localStorage.setItem("isAuth", "Yes");
        localStorage.setItem("role", "user");
        localStorage.setItem("userId", credentials.userId);
        nav.replace('/')
      }
      setIsConnecting(false);
    } catch (e: any) {
      setIsConnecting(false);
      alert(e.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 max-w-lg w-full p-5 bg-gray-50 rounded-xl"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-medium self-center">
              Login as User
            </div>
            <div className="h-[1px] w-full bg-black opacity-20"></div>
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Link href="#" className="text-sm font-medium">
                Forgot Password?
              </Link>
              <Link href="/register" className="text-sm font-bold">
                Sign Up
              </Link>
            </div>
          </div>
          <Button children="Sign In" className="text-white font-bold mt-2 " />
          <div className="w-full flex flex-nowrap items-center gap-3 mt-2 text-gray-400">
            <div className="h-[1px] flex-1 bg-black opacity-20"></div>
            <div>or sign in with</div>

            <div className="h-[1px] flex-1 bg-black opacity-20"></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleGithubButton()}>
              <FaGithub
                size={24}
                className="mr-2 text-gray-400 hover:text-black"
              />
            </button>
            <Link href="#">
              <FaLinkedin
                size={24}
                className="mr-2 text-gray-400 hover:text-[#0077B5]"
              />
            </Link>
            <Link href="#">
              <FaGoogle
                size={24}
                className="mr-2 text-gray-400 hover:text-[#DB4437]"
              />
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

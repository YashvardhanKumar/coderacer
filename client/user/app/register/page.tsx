"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const formSchema = z
  .object({
    username: z.string({ message: "Required" }).min(1).max(50),
    email: z.string({ message: "Required" }).email(),
    password: z
      .string({ message: "Required" })
      .min(8)
      .max(20)
      .refine((password) => /[A-Z]/.test(password), {
        message: "Add an uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Add a lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), { message: "Add a number" })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Add a special character",
      }),
    confirmPassword: z.string({ message: "Required" }).min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-lg w-full p-8 bg-gray-50 rounded-xl"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-medium self-center">
              Register as a User
            </div>
            <div className="h-[1px] w-full bg-black opacity-20"></div>
          </div>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({  }) => (
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
              name="username"
              render={({  }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Choose a Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({  }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Create Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({  }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Confirm your Password" />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link href="/register" className="text-sm font-bold">
                Sign Up
              </Link>
            </div>
          </div>
          <Button className="text-white font-bold mt-2 ">Sign Up</Button>
          <div className="w-full flex flex-nowrap items-center gap-3 mt-2 text-gray-400">
            <div className="h-[1px] flex-1 bg-black opacity-20"></div>
            <div>or sign up with</div>

            <div className="h-[1px] flex-1 bg-black opacity-20"></div>
          </div>
          <div className="flex justify-center gap-4">
          <Button>
              <FaGithub
                size={24}
                className="mr-2 text-gray-400 hover:text-black"
              />
            </Button>
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

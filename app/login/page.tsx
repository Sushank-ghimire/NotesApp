"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import { useUserDataContext } from "@/context/UserDataProvider";
import { isSamePass } from "@/utils/HashPassword";

const Login = () => {
  const formSchema = z.object({
    email: z.string().min(6, {
      message: "Email must be provided.",
    }),
    password: z.string(),
  });

  const { setUserData } = useUserDataContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    try {
      const res = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      console.log(data);

      if(res.ok){
        setUserData(data.userData);
      }
      else alert(data.message);
    } catch (error: any) {
      console.error("Error occured while logging in : ", error.message);
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 text-lg md:text-xl"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" required placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mx-auto" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <div className="w-full mt-4 mx-auto text-center">
        Don't have an account ?{" "}
        <Link className="cursor-pointer text-blue-800" href={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;

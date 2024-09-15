"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { hashPassword } from "@/utils/HashPassword";
import { useRouter } from "next/navigation";

const Signup = () => {
  const formSchema = z.object({
    email: z.string().email("Invalid email address").min(6, {
      message: "Email must be provided.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    username: z.string().trim().min(4, {
      message: "Username is required!",
    }),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.password = await hashPassword(values.password);
    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send the form values
      });
      const data = await res.json();
      alert(data.message);
      if(res.ok) router.push("/login");
    } catch (error: any) {
      console.error("Error found : ", error);
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      {/* Wrap your form inside FormProvider */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 text-lg md:text-xl"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input required placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="password"
            control={form.control}
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

          <Button className="w-full" type="submit">
            Signup
          </Button>
        </form>
      </FormProvider>{" "}
      <div className="mt-4 text-center">
        Already have an account ?{" "}
        <Link className="text-blue-800" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;

"use client";
import { useUserDataContext } from "@/context/UserDataProvider";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  
  const { userData, setUserData } = useUserDataContext();

  const handleLogout = () => {
    const choice = confirm("Do you want to logout ?");
    if (choice) setUserData({
      email: "",
      userName: ""
    })
    else return;
  }

  return (
    <nav className="flex justify-between text-sm px-4 p-2 md:text-2xl md:p-6">
      <h2>Note Master</h2>
      <div className="flex gap-4">
        {userData.email ? (
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white">Logout</Button>
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

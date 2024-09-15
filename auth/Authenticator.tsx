"use client";
import { useUserDataContext } from "@/context/UserDataProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Authenticator = ({ children }: { children: React.ReactNode }) => {

  const { userData } = useUserDataContext();

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (userData.email !== "" || userData.userName !== "" && pathname) {
      return;
    }
    else router.push("/login");
  }, [userData, router]);
  return <>{children}</>;
};

export default Authenticator;

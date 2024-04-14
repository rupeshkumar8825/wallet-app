"use client"
import { db } from "@repo/db/client";
import { Button } from "@repo/ui/button";
// import { Appbar } from "@repo/ui/AppBar";
// import { AppbarClient } from "./AppbarClient";
import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";


// const client = new PrismaClient();


export default async function Page(){ 
  const session = await getServerSession(authOptions);

  const checkForUserSession = () => {
    if(session?.user)
      {
        redirect("/dashboard");
      }
      else
      {
        redirect("/api/auth/signin");
      }
  }

  useEffect(() => {
    console.log("inside the home page.tsx\n\n");
    checkForUserSession();
  }, [])
  
  return (
    <>
    
    </>
  )

}

"use client"
import { db } from "@repo/db/client";
import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react";


// const client = new PrismaClient();


export default function Page(){ 
  const session = useSession();
  return (
    <>
      <div>
        <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}></Appbar>
      </div>
    </>
      );
}

"use client"

import { Appbar } from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";



export const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <>
        <div>
            <Appbar onSignin={signIn} onSignout={async() => {
                await signOut()
                // redirecting the user to the signin page after signout 
                router.push("/api/auth/signin")
            }} user={session.data?.user} ></Appbar>

        </div>
        </>
    )

}
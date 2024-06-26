import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
export const GET = async () => {
    const session = await getServerSession(authOptions);
    console.log("inside GET session function after the user login page ");
    console.log("the value of the session is \n", session);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}
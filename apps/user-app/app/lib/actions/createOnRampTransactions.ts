"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "@repo/db/client";

export async function createOnRampTransaction (amount : number, provider : string)
{
    // fetching the user id of the user from the nextauth 
    // as passing the userid from the function is not safe for this purpose 
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    // the following token would have come from the banking server since we are mocking it hence we will just do a Math.random for this purpose 1
    /*
        const token = await axios.get("https://https://hdfc.com/api/token");
    */
    const token = Math.random().toString();

    if(!userId)
    {
        return {
            message : "User not logged in."
        };

    }
    
    await db.onRampTransaction.create({
        data : {
            userId : parseInt(userId), 
            amount : amount *100, 
            status : "Processing", 
            startTime : new Date(), 
            provider : provider, 
            token : token, 
            
        }
    })
}
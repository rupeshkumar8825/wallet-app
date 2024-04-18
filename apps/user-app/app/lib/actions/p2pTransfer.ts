// here we have to write the server action using the p2p transfer for this purpose 
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "@repo/db/client";

export async function p2pTransfer(to : string, amount: number)
{
    // fetching the session of the user first for this purpose 
    const session = await getServerSession(authOptions);

    const from = session?.user?.id;

    if(!from)
    {
        return {
            message : "Error while sending"
        }   
    }

    const toUser = await db.user.findFirst({
        where : {
            number : to
        }
    })

    // checking whether the to user exists or not for this purpose 
    if(!toUser)
    {
        return {
            message : "User not found"
        }
    }

    // if everything went fine then we can start a transaction here for this purpose 
    await db.$transaction(async (tx) => {
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId : Number(from)
            }
        });

        if(!fromBalance || fromBalance.amount < amount)
        {
            throw new Error("Insufficient funds");
        }

        // now when we know that we have the sender has enough money to send 
        // hence we have to update the balance of the both the users for this purpose 
        await tx.balance.update({
            where: {
                userId : Number(from)
            }, 
            data: {
                amount : {
                    decrement : amount
                }
            }
        });

        await tx.balance.update({
            where : {
                userId : Number(toUser.id)
            }, 
            data : {
                amount : {
                    increment : amount
                }
            }
        });
    });

}
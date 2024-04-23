// import {db} from "@repo/db/client";
import { db } from "@repo/db/client";
import {AddMoney}  from "../../../components/AddMoneyCard";
import  {BalanceCard}  from "../../../components/BalanceCard";
import {OnRampTransactions}  from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";



interface IFinalTxns{
    time : Date, 
    amount : Number, 
    status : String, 
    provider : String, 
    type : String
};

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    // fetching the user session to get the list of transactions for this purpose 
    const session = await getServerSession(authOptions);
    console.log("the value of the session is after fetching the server for this puropse \n", session);
    const userId = session?.user?.id;
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    console.log("the list of transactions is as follows \n", txns);
    
    // fetching the list of p2p transfers for this purpose 
    const p2pTxns = await db.p2pTransfer.findMany({
        where : {
            OR : [
                {
                    toUserId : Number(userId)
                },  
                {
                    fromUserId : Number(userId)
                }
            ]  

        }
    });

    // using the for loop for this purpose 
    let finalTxns : IFinalTxns[] = [];

    txns.forEach(currTransaction => {
        finalTxns.push({
            time : currTransaction.startTime, 
            amount : currTransaction.amount/100, 
            status : currTransaction.status, 
            provider : currTransaction.provider, 
            type : "Received"
        });
    });

    // again using the for loop to map the p2p transactions for this purpose 
    for(let i = 0;i<p2pTxns.length;i++)
    {
        const currTransaction = p2pTxns[i];
        if(!currTransaction)
        {
            continue;
        }
        let provider : string = "NA";
        let type : string = "Received";
        if(currTransaction.toUserId === userId)
        {
            // then this means that this user has got money from someone else 
            // hence here we have to update the provider 
            // we will store the phone number inside the provider section for this purpose 
            const senderUser = await db.user.findFirst({
                where :{
                    id : currTransaction.fromUserId
                }
            });
            if(senderUser)
            {
                provider = senderUser.number;
                type = "Received";
            }
        }
        else 
        {
            // this means that this user has sent money to other user 
            // we again have to find that particular user for this purpose 
            const sendingToUser = await db.user.findFirst({
                where : {
                    id : currTransaction.toUserId
                }
            });

            if(sendingToUser)
            {
                provider = sendingToUser.number;   
                type = "Sent";
            }
        }
        
        finalTxns.push({
            time : currTransaction.timeStamp, 
            amount : currTransaction.amount/100,
            status : "Success", 
            provider : provider, 
            type : type
        });   
    }
   
    console.log("the list of p2p TRANSACTIONS is as follows \n", p2pTxns);
    console.log("the list of FINAL TRANSACTIONS is as follows \n", finalTxns);
    
    return finalTxns;
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}
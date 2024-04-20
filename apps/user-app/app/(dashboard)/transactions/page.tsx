import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";
import { db } from "@repo/db/client";



// function to fetch the list of onRampTransactions for this purpose 
const getOnRampTransactions = async () => {
    // fetching the user session to get the list of transactions for this purpose 
    const session = await getServerSession(authOptions);
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount/100,
        status: t.status,
        provider: t.provider
    }))
}



const Transaction = async () => {
    const transactions = await getOnRampTransactions();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transactions
        </div>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-1 p-4">
            <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
            </div>
        </div>
    </div>
}

export default Transaction;
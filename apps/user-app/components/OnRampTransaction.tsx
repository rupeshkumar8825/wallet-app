import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: Number,
        // TODO: Can the type of `status` be more specific?
        status: String,
        provider: String, 
        type : String
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex content-center justify-between mb-5 border h-15">
                <div className="flex flex-col justify-center">
                    <div className="text-sm">
                        {t.type} INR {t.type==="Sent"? "to" : "from"} {t.provider}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>

                <div className=" flex flex-col justify-center w-40">
                    {t.status}
                </div>

                <div className="  flex flex-col justify-center w-40">
                    {t.type=="Sent"? "-" : "+"} Rs {t.amount as number}
                </div>

            </div>)}
        </div>
    </Card>
}
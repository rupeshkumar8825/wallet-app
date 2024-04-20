// this is the component for the send card for this purpose which will be used in other pages for this purpose 

"use client"
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { Card } from "@repo/ui/card";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            // here we have to call the function to transfer the money to one peer to another peer for this purpose 
                            await p2pTransfer(number, Number(amount)*100);
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}
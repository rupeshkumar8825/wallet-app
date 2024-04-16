"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import React, { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { OnRampTransactions } from "./OnRampTransaction";
import { db } from "@repo/db/client";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState<number>(0);
    const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name as string);


    const onChangeAmountHandler = (value : string) => {
        const targetValue = value;
        setAmount(parseInt(targetValue));
    }


    const onSelectBankHandler = (value : string) => {
        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
        setProvider(value);
    }

    // handling the transfer of the money from the bank to the wallet app 
    const handleAddMoneyTranfer = async () => {
        await createOnRampTransaction(amount*100, provider);
        window.location.href = redirectUrl || "";

    }

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={onChangeAmountHandler} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={onSelectBankHandler} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={() => handleAddMoneyTranfer()}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}
import express from "express";

const app = express();

app.post("/hdfcWebhook", (req, res) => {
    

    // here we have to make some database changes for this purpose 
    // 1. check for the amount that was confirmed by the hdfc bank 
    // 2. update the transaction status as approved in the database
    // 3. increase the wallet balance by that particular amount for this purpose 
    const paymentInformation = {
        token : req.body.token, 
        userId : req.body.user_identifier, 
        amount : req.body.amount
    }
})
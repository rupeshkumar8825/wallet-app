import express from "express";
import {db} from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    // add the zod validation here 

    // check if this request actually came from hdfc bank, use a webhook secret here 

    // here we have to make some database changes for this purpose 
    // 1. check for the amount that was confirmed by the hdfc bank 
    // 2. update the transaction status as approved in the database
    // 3. increase the wallet balance by that particular amount for this purpose 
    try {
        const paymentInformation = {
            token : req.body.token, 
            userId : req.body.user_identifier, 
            amount : req.body.amount
        }

        // since we need the following 2 database changes to occur completely then we have to use transaction here for this purpose 
        await db.$transaction([

            db.balance.update({
                where : {
                    userId : paymentInformation.userId
                }, 
                data : {
                    amount : {
                        increment : paymentInformation.amount
                    }
                }
            }),
        
            // now we have to update the onramp transaction table here in order to mark the transaction as completed for this purpose 
            db.onRampTransaction.update({
                where : {
                    token : paymentInformation.token
                }, 
                data : {
                    status : "Success"
                }
            })
        ]);
    
        // updating the db here 

        // sending the 200 status code telling the server  that we have successfully captured the payment request 
        res.status(200).json({
            message : "Captured"
        });
        
    } catch (error) {
        // here some error happened and hence we have to return the 400 status code to hdfc bank server in order to make sure that bank start refund procedure 
        res.status(411).json({
            message : "Some Error happened"
        });
    }



})
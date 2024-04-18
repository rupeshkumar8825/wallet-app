import {db} from '@repo/db/client';
import CredentialsProvider  from "next-auth/providers/credentials"
// import 
// import bcrypt from "bcrypt";
// import db from "@repo/db/client/prisma";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";



// import 

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials', 
            credentials : {
                email : {label : "Enter your Email here", type : "text", placeholder : "123@gmail.com"},
                phone : {label : "Phone Number", type : "text", placeholder : "1212121"},
                password : {label : "Password", type : "text"}

            }, 

            async authorize(credentials : any){
                console.log("inside the authorize function in the authoptions in users app for this purpose");
                console.log("the credentials of the user is \n", credentials);
                console.log(typeof(credentials.password.toString()));
                //DO zod validation here OTP validation here for this purpose 
                const hashedPassword = await bcrypt.hash(credentials.password.toString(), 10);
                console.log("the hashed password is: " + hashedPassword);
                const existingUser = await db.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                });
                console.log("the value of the existing user is " + existingUser);
                // check whether the user already exists
                if (existingUser) {
                    console.log("GOT THE USER IN DB\n\n");
                    // check whether password is correct or not for this purpose
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);

                    // if password is correct then we have to return the info to form the cookies and session on the nextjs app for this purpose 
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }

                    // else return null this means that the validation is not correct 
                    return null;
                }
                

                // if the user does not exist then we have to create the new entry in the db with the given  credentials for this purpose 
                try {
                    // using the prisma to create the new entry in db for this purpose 
                    console.log("USER DOES NOT EXIST HENCE CREATING NEW ONE\n\n\n");
                    const user = await db.user.create({
                        data: {
                            email : credentials.email,
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    
                    // here also we have to create the balance entry in the database for that particular user for this purpose 
                    const balance = await db.balance.create({
                        data : {
                            userId : user.id, 
                            amount : 0, 
                            locked : 0, 
                        }
                    });

                    // TODO:: Ideally we should be able to send the OTP to the user and then verify them to be able to login to the wallet app for this purpose. This is something we will be creating in future as the upcoming feature for this purpose 
                    // then returning the credentials of the user to make the session using the cookie for this purpose 
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch(e) {
                    console.error(e);
                }
    
                return null
                    
            }   
        }

    )
], 
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            console.log("inside the session callback function of the user");
            session.user.id = token.sub

            return session
        }
    }
}
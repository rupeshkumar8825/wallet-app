import CredentialsProvider  from "next-auth/providers/credentials"
// import 
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials', 
            credentials : {
                phone : {label : "Phone Number", type : "text", placeholder : "1212121"},
                password : {label : "Password", type : "text"}

            }, 

            async authorize(credentials : any){
                //DO zod validation here OTP validation here for this purpose 
                const hashedPassword = await bcrypt.has(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where : {
                        number : credentials.phone
                    }
                });

                // check whether the user already exists
                if (existingUser) {
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
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    
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
            session.user.id = token.sub

            return session
        }
    }
}
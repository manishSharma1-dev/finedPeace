import { ConnectDb } from "@/connections/dbConnect";
import { NextAuthOptions } from "next-auth";
import { UserModel } from "@/model/user.model";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : 'credentials',
            name : 'credentials',

            credentials : {
                email: { label: "Email", type: "text"},
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials:any) : Promise<any> {
                await ConnectDb() 

                try {

                    const user = await UserModel.findOne({
                       email : credentials.email
                    })

                   console.log("User is being founding")
                                       
                    if(!user){
                       console.log("User no found")
                       throw new Error("User not found")
                    }

                    console.log("user founded")

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)

                    console.log("User password check",isPasswordCorrect)

                    if(isPasswordCorrect){
                       return user 
                    } else {
                       throw new Error("Password didn't match")
                    }


                } catch (error) {
                    throw new Error("Failed to find the user")
                }

            }
        })
    ],
    callbacks : { 
        async jwt({ token, user }) {
            if(user){ //Adding custom value to the token to avoid extra database query and this will be done by creating an new next-auth.d.ts file 
                // token._id = user?.id
                // token.email = user.email

                token._id = user?._id,
                token.username = user?.username,
                token.email = user?.email
            }

            return token

        },
        async session({ session, token }) { //adding custom value to the session token
            // if(session && session.user){
            //     session.user.email  = token.email
            // }
            // return session

            // updated from thid to this ***************************

            if(token){
                session.user._id = token?._id,
                session.user.username = token?.username,
                session.user.email = token?.email
            }

            return session

        }
    },
    pages : {
        signIn : '/sign-in' //Next auth will automatically Create a sign-in page by this cmd...
    },
    session :  {
        strategy : 'jwt', //will by default use session jwt 
    }, 
    secret : process.env.NEXTAUTH_SECERET_KEY
}



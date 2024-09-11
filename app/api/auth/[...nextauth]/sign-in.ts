// import { connectDB } from "@/lib/databaseConnection";
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
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials:any) : Promise<any> {

                try {

                    await ConnectDb() 

                    const user = await UserModel.findOne({
                        $or : [
                            { email : credentials?.identifiers},
                            { password : credentials?.identifiers}
                        ]
                    })
                    
                    if(!user){
                        throw new Error("User Not Found")
                    }

                    const isPasswordCorrect: boolean = await bcrypt.compare(credentials.password,user.password)

                    if(isPasswordCorrect){
                        return user
                    } else {
                        return Response.json({ success : false, message : "Password didn't match "},{ status : 500 })
                    }

                } catch (error : any) {
                    throw new Error("Failed to find the user",error)
                }

            }
        })
    ],
    callbacks : { 
        async jwt({ token, user }) {
            if(user){ //Adding custom value to the token to avoid extra database query
                token._id = user?.id
                token.email = user.email
            }

            return token
        },
        async session({ session, token }) { //adding custom value to the session token
            if(session && session.user){
                session.user.email  = token.email
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



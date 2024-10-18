import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NodeCache from 'node-cache'
import { NextResponse } from "next/server";

const myCache = new NodeCache()

export async function GET(request : Request) {
    await ConnectDb()

    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return Response.json(
                {
                    success  :false,
                    message : "Login -pls"
                },
                {
                    status : 400
                }
            )
        }

        const cacheKey = JSON.stringify("userProfile")
        const CachedResult = myCache.get(cacheKey)

        if(CachedResult){
            console.log("Profile data is already i cache")

            return NextResponse.json(
                {
                    success : true,
                    message : "Profile data is already in cache",
                    data : CachedResult
                },
                {
                    status : 200
                }
            )
        } else {
            const userID = session?.user._id

            const user = await UserModel.findById(userID)

            if(!user){
                return Response.json(
                        {
                            success : false,
                            message : "Invalud -userId"
                        },
                        {
                            status : 400
                        }
                    )
                }

                myCache.set(cacheKey,user,3600)

                return Response.json(
                    {
                        success : true,
                        message : "User -Found",
                        data : user
                    },
                    {
                        status : 200
                    }
                )
            }
        
    } catch (error) {
        console.error("Error Ocuured While fetchoing details from the user")

        return Response.json(
            {
                success  : false,
                message  : "Error -fetching User detail"
            },
            {
                status  : 500
            }
        )
    }
}
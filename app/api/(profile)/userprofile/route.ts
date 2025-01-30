import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NodeCache from 'node-cache'
import { NextResponse } from "next/server";

const myCache = new NodeCache()

export async function GET(request : Request) {
    try {
        await ConnectDb()

        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                {
                    message : "User is logged out"
                },
                {
                    status : 400
                }
            )
        }

        const cacheKey = JSON.stringify("userProfile")
        const CachedResult = myCache.get(cacheKey)

        if(CachedResult){
            return NextResponse.json(
                {
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
                return NextResponse.json(
                        {
                            message : "Invalud -userId"
                        },
                        {
                            status : 400
                        }
                    )
            }

            myCache.set(cacheKey,user,3600)

            return NextResponse.json(
                {
                    message : "User -Found",
                    data : user
                },
                {
                    status : 200
                }
            )
        }
        
    } catch (error) {
        return NextResponse.json(
            {
                message  : error ?? "failed to fetch User detail"
            },
            {
                status  : 500
            }
        )
    }
}
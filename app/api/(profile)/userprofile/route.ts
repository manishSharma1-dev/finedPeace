import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

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

            const userID = session?.user._id

            const user = await UserModel.findById(userID)

            if(!user){
                return NextResponse.json(
                        {
                            message : "Invalid -userId"
                        },
                        {
                            status : 400
                        }
                    )
            }

            return NextResponse.json(
                {
                    message : "User -Found",
                    data : user
                },
                {
                    status : 200
                }
            )
        
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
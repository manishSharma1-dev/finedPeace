import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        await ConnectDb()

        const { thought } = await req.json()

        if(!thought){
            return NextResponse.json(
                {
                    message : "Invalid Thought Property"
                },
                {
                    status : 400
                }
            )
        }

        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                {
                    message : "You are Logged out"
                },
                {
                    status : 400
                }
            )
        }

        console.log("test 4")

        const session_username = session.user?.username

        console.log("test 5")

        const thoughtCreated = await thoughtModel.create({
            username : session_username,
            content : thought
        })

        console.log("test 6")

        if(!thoughtCreated){
            return NextResponse.json(
                {
                    message : "Failed Adding Thought"
                },
                {
                    status : 500
                }
            )
        }


        console.log("test 7")

        return NextResponse.json(
            {
                message : "Added Thought",
                data : thoughtCreated
            },
            {
                status : 201
            }
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                message : error ?? "Adding Thought Failed"
            },
            {
                status : 500
            }
        )
    }
}
import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
// import NodeCache from "node-cache"
import { NextResponse } from "next/server";

// const myCache = new NodeCache();

export async function GET(request:Request) {
    try {

        await ConnectDb()

        const thoughts = await thoughtModel.find({ }).sort({ createdAt : -1 })

        if(!thoughts){
            return NextResponse.json(
                {
                    message: "Thoughts fetching Failed"
                },
                {
                    status : 500
                }
            )
        }

        return NextResponse.json(
            {
                message: "Fetched All Thought",
                data  : thoughts
            },
            {
                status : 200
            }
        ) 
        
    } catch (error) {
        return NextResponse.json(
            {
                success : false,
                messsage : "Fatching all thoughts failed"
            },
            {
                status : 500
            }
        )
    }
}
import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {

        await ConnectDb()

        const thoughts = await thoughtModel.find({ }).sort({ createdAt : -1 })

        if(!thoughts || thoughts.length === 0){
            return NextResponse.json(
                {
                    message: "No thoughts found"
                },
                {
                    status : 500
                }
            )
        }

        console.log(thoughts)

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
                messsage : error ?? "Fatching all thoughts failed"
            },
            {
                status : 500
            }
        )
    }
}
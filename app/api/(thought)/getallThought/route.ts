import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import NodeCache from "node-cache"
import { NextResponse } from "next/server";

const myCache = new NodeCache();

export async function GET(request:Request) {
    await ConnectDb()

    try {

        const cacheKey = JSON.stringify("Alldata")
        const CachedResult = myCache.get(cacheKey)

        if(CachedResult){
            return NextResponse.json(
                {
                    message : "data already in cache",
                    data : CachedResult
                }
        )

        } else {

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

            myCache.set(cacheKey,thoughts,3600)

            return NextResponse.json(
                {
                    message: "Fetched All Thought",
                    data  : thoughts
                },
                {
                    status : 200
                }
            ) 
        }   
        
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
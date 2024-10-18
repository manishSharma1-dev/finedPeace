import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NodeCache from "node-cache"

const myCache = new NodeCache();

export async function GET(request:Request) {
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

        const cacheKey = JSON.stringify("Alldata")
        const CachedResult = myCache.get(cacheKey)

        if(CachedResult){
            return Response.json(
                {
                    success : true,
                    message : "data already in cache",
                    data : CachedResult
                }
            )

        } else {

            const response = await thoughtModel.find({ }).sort({ createdAt : -1 })

            if(!response){
                return Response.json(
                    {
                        success: false,
                        message: "Thoughts fetching Failed"
                    },
                    {
                        status : 500
                    }
                )
            }

            if(response.length < 0){
                return Response.json(
                    {
                        success  : true,
                        message: "No thoughts avialable"
                    },
                    {
                        status : 200
                    }
                )
            }

            myCache.set(cacheKey,response,3600)

            return Response.json(
                {
                    success  : true,
                    message: "No thoughts avialable",
                    data  : response
                },
                {
                    status : 200
                }
            ) 
        }   
        
    } catch (error) {
        console.error("Fetching all thougts failed",error)
        return Response.json(
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
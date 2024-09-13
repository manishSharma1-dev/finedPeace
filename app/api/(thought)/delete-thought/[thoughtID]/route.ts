import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export async function DELETE(request:Request, params:any) {
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


        const response = await thoughtModel.findByIdAndDelete(params?.thoughtID)

        if(!response){
            return Response.json(
                {
                    success : false,
                    message : "Invalid Thought -id"
                },
                {
                    status : 400
                }
            )
        }

        return Response.json(
            {
                success : true,
                message : "Thought -delete"
            },
            {
                status : 200
            }
        )
        
    } catch (error) {

        console.error("Thought -delete Failed",error)

        return Response.json(
            {
                success : false,
                message : "thought -delete Failed"
            },
            {
                status : 500
            }
        )
    }
}
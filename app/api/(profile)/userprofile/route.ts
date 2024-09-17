import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

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
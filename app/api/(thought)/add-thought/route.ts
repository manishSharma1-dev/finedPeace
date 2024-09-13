import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { UserModel } from "@/model/user.model";

export async function POST(request:Request) {
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

        const useremail = session.user?.email

        const user = await UserModel.findOne({
            email : useremail
        })

        if(!user){
            return Response.json(
                {
                    success  :false,
                    message : "Invalid -emial credential"
                },
                {
                    status : 400
                }
            )
        }

        const { content } = await request.json()

        const response = await thoughtModel.create({
            username : user?.username,
            content : content
        })

        if(!await thoughtModel.findById(response._id)){

            return Response.json(
                {
                    success  :false,
                    message : "Thought -adding Failed"
                },
                {
                    status : 500
                }
            )
        }

        return Response.json(
            {
                success  :true,
                message : "Thought -added Success",
                data : response
            },
            {
                status : 201
            }
        )
        
    } catch (error) {
        console.error("Adding Thought Failed")
        return Response.json(
            {
                success : false,
                message : "Adding Thought Failed"
            },
            {
                status : 500
            }
        )
    }
}
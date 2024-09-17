import { ConnectDb } from "@/connections/dbConnect";
import { UserModel } from "@/model/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import bcrypt from 'bcryptjs'

export async function POST(request:Request) {
    await ConnectDb()

    try {

        const { newpassword, oldpassword } = await request.json()
        //user provide - old password
        //old password will be matched - if no then return null
        // if yes - update the old password with thw new onw 

        const session = await getServerSession(authOptions)

        if(!session){
            return Response.json(
                {
                    success : false,
                    message : "login -pls"
                },
                {
                    status : 400
                }
            )
        }

        const userId = session?.user._id

        const user = await UserModel.findById(userId)

        if(!user){
            throw new Error("User not -Found")
        }

        const result = await bcrypt.compare(oldpassword,user?.password)

        if(!result){
            throw new Error("Password didn't -match")
        }

        user.password = newpassword

        await user.save({ validateBeforeSave : true })

        return Response.json(
            {
                success : true,
                message : "password -updated"
            },
            {
                status : 201
            }
        )
        
    } catch (error) {
        console.error("Password Changing failed",error)

        return Response.json(
            {
                success : false,
                message : "Password -changing Failed"
            },
            {
                status : 500
            }
        )
    }
}
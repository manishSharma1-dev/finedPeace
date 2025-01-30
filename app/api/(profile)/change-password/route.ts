import { ConnectDb } from "@/connections/dbConnect";
import { UserModel } from "@/model/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        
        await ConnectDb()

        const { oldpassword,newpassword } = await request.json()

        if(!oldpassword && !newpassword){
            return NextResponse.json(
                {
                    message : "Invalid Properties.."
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
                    message : "User is logged out"
                },
                {
                    status : 400
                }
            )
        }

        const user = await UserModel.findById(session.user._id)

        if(!user){
            return NextResponse.json(
                {
                    message : "Failed user id is invalid"
                },
                {
                    status : 400
                }
            )
        }

        if(oldpassword != user.password){
            return NextResponse.json(
                {
                    message : "Password didn't -match"
                },
                {
                    status : 400
                }
            )
        }

        const hashedPassword = await bcrypt.hash(newpassword,10)

        user.password = hashedPassword

        await user.save({ validateBeforeSave : true })        

        return NextResponse.json(
            {
                message : "password -updated"
            },
            {
                status : 200
            }
        )
        
    } catch (error) {

        return Response.json(
            {
                message : error ?? "Password -changing Failed"
            },
            {
                status : 500
            }
        )
    }
}
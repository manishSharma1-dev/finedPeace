import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { User } from "@/model/user.model"

export async function POST(request:Request) {

    await ConnectDb()

    try {
        
        const { username, fullName, email, password} : User = await request.json()

        if(!username && !fullName && !email && !password){
            return NextResponse.json(
                {message : "Invalid Properties by user"},
                {status : 404}
            )
        }

        const existedUser = await UserModel.findOne({
            email
        })

        if(existedUser){
            return NextResponse.json(
                {
                    message : "Email Already Registered"
                },
                {
                    status : 200
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await UserModel.create({
            username : username,
            fullName : fullName,
            email : email,
            password : hashedPassword
        })

        if(!user){
            return NextResponse.json(
                {
                    message : "User Didn't Created"
                },
                {
                    status : 500
                }
            )
        }

        return NextResponse.json(
            {
                 message : "User Registered"
            },
            {
                status : 201
            }
        )


    } catch (error) {
        return NextResponse.json(
            {
                message : error ?? "User Registration Failed"
            },
            {
                status : 500
            }
        )
    }
}
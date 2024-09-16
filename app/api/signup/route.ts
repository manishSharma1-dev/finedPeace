import { UserModel } from "@/model/user.model";
import { ConnectDb } from "@/connections/dbConnect";
import bcrypt from "bcryptjs"
import { Apiresponse } from "@/types/ApiResposne";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    // User SignUp 
    // 1 -> first check if db is already Connected or not and give reaponse aq to it,if not 
    // 2 -> take the credential from the user
    // 3 check for the credential
    // 4 -> Password hash
    // 5 -> Creta User ANd Send Reposnse aq to it 
    // 6 -> check if user is already Registered

    await ConnectDb()

    try {
        
        const { username, fullName, email, password} = await request.json()
        // console.log("getting data fiels",username,fullName,email,password)

        if(!username && !fullName && !email && !password){
            return Response.json(
                {
                    success  : false,
                    message : "Invalid Properties by user"
                },
                {
                    status : 400
                }
            )
        }

        const existedUser = await UserModel.findOne({
            email
        })

        if(existedUser){
            return Response.json(
                {
                    success : false,
                    message : "User Already Exits"
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

        const CheckifUserCreated = await UserModel.findById(user._id)

        if(!CheckifUserCreated){
            return Response.json(
                {
                    success : false,
                    message : "User Didn't Created"
                },
                {
                    status : 500
                }
            )
        }

        await user.save({ validateBeforeSave  : true })

        // return Response.json(
        //     {
                // success : true,
                // message : "User Registered"
        //     },
        //     {
        //         status : 201
        //     }
        // )

        return NextResponse.json(
            {
                 success : true,
                 message : "User Registered"
            },
            {
                status : 201
            }
        )


    } catch (error) {
        console.error("User Registration Failed")

        return Response.json(
            {
                success :false,
                message : "User Registration Failed"
            },
            {
                status : 500
            }
        )
    }

}
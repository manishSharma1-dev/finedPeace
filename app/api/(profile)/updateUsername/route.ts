import { ConnectDb } from "@/connections/dbConnect";
import { UserModel } from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function PUT(req:Request) {
    try {
        await ConnectDb()

        const { newUsername } = await req.json()
        const session  = await getServerSession(authOptions)

        if(!newUsername){
            return NextResponse.json(
                {message : 'Invalid Username property'},
                {status : 404}
            )
        }

        if(!session){
            return NextResponse.json(
                {message : 'User is logged out'},
                {status : 404}
            )
        }

        const updatedUsername = await UserModel.findByIdAndUpdate(
            session.user._id,
            {$set : { username : newUsername }}
        )

        if(!updatedUsername){
            return NextResponse.json(
                {message : 'Username Updation failed'},
                {status : 404}
            )
        }

        await updatedUsername.save({ validateBeforeSave : true })

        return NextResponse.json(
            {message : 'Username Updated',data : updatedUsername},
            {status : 200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message : error ?? 'Internal server error'},
            {status : 500}
        )
    }
}

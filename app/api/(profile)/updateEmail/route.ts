import { ConnectDb } from "@/connections/dbConnect";
import { UserModel } from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function PUT(req:Request) {
    try {
        await ConnectDb()

        const { newEmail } = await req.json()

        console.log(newEmail)

        const session  = await getServerSession(authOptions)

        if(!newEmail){
            return NextResponse.json(
                {message : 'Invalid email property'},
                {status : 404}
            )
        }

        if(!session){
            return NextResponse.json(
                {message : 'User is logged out'},
                {status : 404}
            )
        }

        const updateEmail = await UserModel.findByIdAndUpdate(
            session.user._id,
            {$set : { email : newEmail }}
        )

        if(!updateEmail){
            return NextResponse.json(
                {message : 'Email Updation failed'},
                {status : 404}
            )
        }

        await updateEmail.save({ validateBeforeSave : true })

        return NextResponse.json(
            {message : 'Email Updated',data : updateEmail},
            {status : 200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message : error ?? 'Internal server error'},
            {status : 500}
        )
    }
}
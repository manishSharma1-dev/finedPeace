import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request:Request, { params } : { params : any }) {
    await ConnectDb()

    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                {
                    success  :false,
                    message : "Login -pls"
                },
                {
                    status : 400
                }
            )
        }


        const { thoughtID } = params;

        console.log("Thought id from the frontend",thoughtID)

        //--------------------
          const thought = await thoughtModel.findById(thoughtID)

          if(!thought){
            return NextResponse.json(
                {
                    success : false,
                    message : "thought -id Failed"
                },
                {
                    status : 500
                }
            )
          }

        //   const ThoughtuserDetail = await UserModel.findOne({ username  : thought?.username })

        //   if(!ThoughtuserDetail){
        //     return Response.json(
        //         {
        //             success : false,
        //             message : "Username in thought is invalid"
        //         },
        //         {
        //             status : 400
        //         }
        //     )
        //   }

        //--------------------

        if(thought?.username != session.user.username){
            console.log("You cannot delete others thought")
            return NextResponse.json(
                {
                    success : false,
                    message : "You cannot delete others thought"
                },
                {
                    status : 400
                }
            )

        } else {
            const response = await thoughtModel.findByIdAndDelete(thoughtID)

            if(!response){
            return NextResponse.json(
                    {
                        success : false,
                        message : "Invalid Thought -id"
                    },
                    {
                        status : 400
                    }
                )
            }

            return NextResponse.json(
                    {
                        success : true,
                        message : "Thought -delete"
                    },
                    {
                        status : 200
                    }
                )
            
            }

    } catch (error) {

        console.error("Thought -delete Failed",error)

        return NextResponse.json(
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
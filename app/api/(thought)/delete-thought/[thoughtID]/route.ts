import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request:Request) {
    try {
        await ConnectDb()

        const url = new URL(request.url)
        const thoughtID = url.pathname.split('/').pop()

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

        if(!thoughtID){
            return NextResponse.json(
                {
                    message : "Invalid Thought id"
                },
                {
                    status : 400
                }
            )
        }

        //--------------------

          const thought = await thoughtModel.findById(thoughtID)

          if(!thought){
            return NextResponse.json(
                {
                    message : "thought -id Failed"
                },
                {
                    status : 500
                }
            )
          }

        

        if(thought?.username != session.user.username){
            
            return NextResponse.json(
                {
                    message : "You cannot delete others thought"
                },
                {
                    status : 400
                }
            )

        } else {
            const thoughtDeleted = await thoughtModel.findByIdAndDelete(thoughtID)

            if(!thoughtDeleted){
            return NextResponse.json(
                    {
                        message : "Invalid Thought -id"
                    },
                    {
                        status : 400
                    }
                )
            }

            return NextResponse.json(
                    {
                        message : "Thought -delete",
                        data : thoughtDeleted
                    },
                    {
                        status : 200
                    }
                )
            
            }

    } catch (error) {
        return NextResponse.json(
            {
                message : error ?? "Thought deletion failed"
            },
            {
                status : 500
            }
        )
    }
}
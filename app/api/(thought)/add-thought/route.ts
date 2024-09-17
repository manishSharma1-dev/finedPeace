import { thoughtModel } from "@/model/thoughts.model";
import { ConnectDb } from "@/connections/dbConnect";
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options";
import { UserModel } from "@/model/user.model";

export async function POST(request:Request) {
    await ConnectDb()

    try {

        console.log("Session will be checked here")

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

        console.log("Session founded")

        // const useremail = session.user?.email
        const userId = session.user?._id
        // const username_from_the_session = session.user?.username

        // const user = await UserModel.findOne({
        //     email : useremail
        // })

        const user = await UserModel.findById(userId)

        
        if(!user){
            return Response.json(
                {
                    success  :false,
                    message : "Invalid -userId credential"
                },
                {
                    status : 400
                }
            )
        }
        
        console.log("User Founded")

        const { thought } = await request.json()

        console.log("thougth fromt the frontend",typeof(thought))

        const thoughtCreated = await thoughtModel.create({
            username : userId, // wait focus here i need to pass th id fiedl cuz in thought model i had set the username field with object id and no user?.username shall be here
            content : thought
        })

        console.log("thought created successfully")

        if(!await thoughtModel.findById(thoughtCreated._id)){

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

        console.log("thought added Successfully")

        await user.save({ validateBeforeSave  : true })

        return Response.json(
            {
                success  :true,
                message : "Thought -added Success",
                data : thoughtCreated
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
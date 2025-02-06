import mongoose from "mongoose";

let connection : boolean = false;

export async function ConnectDb():Promise<void> {

    if(connection == true){
        console.log("Using Exisiting Db conn...")
        return;
    }

    try {

        await mongoose.connect(`${process.env.MONGO_URI}Findpeace`)
        connection = true;
        console.log("New DB conn.. established")
        
    } catch (error) {
        console.log("Failed to Connect to DB...",error)
    }
}
import mongoose from "mongoose";

type connectionObject = {
    isConnected? : number
}

const connection:connectionObject = {}

export async function ConnectDb():Promise <void>{
    if(connection.isConnected){
        console.log("MOngo Db is already Connected")
    } else  { 

        try {
            const db = await mongoose.connect(`${process.env.MONGO_URI}Findpeace`)
            console.log("errror found here")
            connection.isConnected = db.connections[0].readyState
            console.log("Mongo Db connected Successfully")
            
        } catch (error) {
            console.error("Connecting Database Failed",error)
        }
    }
}

// await mongoose.connect(`${process.env.MONOGO_URI}/findPeace`)
// console.log("DataBase Connected Successfully")
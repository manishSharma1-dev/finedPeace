// import mongoose from "mongoose";

// let connection : boolean = false;

// export async function ConnectDb():Promise<void> {

//     if(connection == true){
//         console.log("Using Exisiting Db conn...")
//         return;
//     }

//     try {

//         await mongoose.connect(`${process.env.MONGO_URI}Findpeace`)
//         connection = true;
//         console.log("New DB conn.. established")
        
//     } catch (error) {
//         console.log("Failed to Connect to DB...",error)
//     }
// }

import mongoose from "mongoose";

let isConnected = false;

export async function ConnectDb(): Promise<void> {
  if (isConnected) {
    console.log("using exisiting conn")
    return; 
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.DB_NAME,
    });

    isConnected = true; 
    console.log("db connected")
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}
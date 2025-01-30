import mongoose,{ Schema,Document } from "mongoose";
import { Thought } from "@/model/thoughts.model"

export interface User extends Document {
    username : string,
    fullName : string,
    email : string,
    password : string,
    thoughts? : Thought[]
}

const UserSchema:Schema<User>  = new Schema({
    username : {
        type  : String,
        unique : true,
        required : true
    },
    fullName : {
        type : String,
        required :true
    },
    email : {
        type : String,
        unique  :true,
        required : true
    },
    password : {
        type : String,
        required :true
    },
    thoughts : [{
            type : Schema.Types.ObjectId,
            ref : "Thought"
    }]
}, { timestamps  : true})

// Checkng if the user model is already Credated if no then crete an User model

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("User",UserSchema)

export {
    UserModel
}



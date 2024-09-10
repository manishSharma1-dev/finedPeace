import mongoose,{ Schema,Document } from "mongoose";

export interface User extends Document {
    username : string,
    fullName : string,
    email : string,
    password : string
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
    }
})

// Checkng if the user model is already Credated if no then crete an User model

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("UserModel",UserSchema)

export {
    UserModel
}



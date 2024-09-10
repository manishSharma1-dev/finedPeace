import mongoose,{ Schema,Document } from "mongoose";

export interface User extends Document {
    username : string,
    fullName : string,
    email : string,
    password : string,
    verificationCode : string,
    verificationCodeExpiry : Date
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
    verificationCode : {
        type : String,
        required :[true,"Verifiaction Code is Neccessay"]
    },
    verificationCodeExpiry : {
        type: Date,
        required: true
    }
})

// Checkng if the user model is already Credated if no then crete an User model

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("UserModel",UserSchema)

export {
    UserModel
}



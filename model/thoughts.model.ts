import mongoose,{ Schema, Types } from "mongoose";

export interface thought extends Document{
    username : Types.ObjectId,
    content : string
}

const thoughtSchema:Schema<thought> = new Schema({
    username : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        required : true
    }
},{ timestamps : true })

const thoughtModel = (mongoose.models.thought as mongoose.Model<thought>) || mongoose.model("thoughtModel",thoughtSchema)

export {
    thoughtModel
}
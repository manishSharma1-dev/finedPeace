import mongoose,{ Schema,Document  } from "mongoose";

export interface Thought extends Document{
    username : Schema.Types.ObjectId
    content : string
}

const thoughtSchema:Schema<Thought> = new Schema({
    username : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        required : true
    }
},{ timestamps : true })

const thoughtModel = (mongoose.models.Thought as mongoose.Model<Thought>) || mongoose.model("Thought",thoughtSchema)

export { 
    thoughtModel
}
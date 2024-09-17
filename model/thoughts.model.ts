import mongoose,{ Schema,Document  } from "mongoose";

export interface Thought extends Document{
    username : string
    content : string
}

const thoughtSchema:Schema<Thought> = new Schema({
    username : {
       type : String,
       required : true
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
import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    clerkId:{
       type: String, 
       required:true
    },
    email:{
        type: String, 
        required:true
     },
    username:{
        type: String, 
        required:true
     },
     firstName:{
        type: String, 
        required:true
     },
     lastName:{
        type: String, 
        required:true
     },
     photo :{
        type: String, 
        required:true
     }
})

export const User = models.users || model("users",userSchema)
import mongoose, { Model, model, models, Schema } from "mongoose";


export interface UserType extends Document {
   clerkId: string;
   email: string;
   username?: string;
   firstName: string;
   lastName: string;
   photo: string;
   address?: string;
   phoneNumber?: number;
   role?: string; // Optional since it has a default value
   coins: number
 }

const userSchema:Schema<UserType> = new Schema({
    clerkId:{
       type: String, 
       required:true
    },
    email:{
        type: String, 
        required:true
     },
     username:{
        type: String
     },
     firstName:{
        type: String, 
        required:true
     },
     lastName:{
        type: String, 
        required:true
     },
     photo:{
        type: String, 
        required:true
     },
      address: {
         type: String, 
     },
     phoneNumber:{
      type: Number, 
     },
     role:{ 
      type: String, 
      default: "Buyer"
     },
     coins:{
      type: Number,
      default: 0
     }
})

export const User = (models.users as Model<UserType>) || model<UserType>("users",userSchema)
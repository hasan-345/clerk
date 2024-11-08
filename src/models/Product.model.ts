import { Model, model, models, Schema, Types } from "mongoose";
import { UserType } from "./User.model";

export interface productType extends Document {
   name: string;
   description: string;
   price: number;
   discountPrice: number;
   photos: string[];
   rating: string;
   owner: UserType; 
   createdBy: Date;
   category:string;
   stock: number
 }

const productSchema:Schema<productType> = new Schema({
     name:{
       type: String, 
       required:true
     },
     description:{
        type: String, 
        required:true
     },
     price:{
        type: Number, 
        required:true
     },
     discountPrice:{
        type: Number, 
        required:true
     },
     photos:{
        type: [String], 
        required:true
     },
      rating: {
         type: String, 
         required:true
     },
     owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
     },
     createdBy:{
      type: Date,
      default: Date.now
     },
     category:{
        type: String,
        required: true
     },
     stock:{
      type: Number,
      default: 0
     }
})

export const Product = (models.products as Model<productType>) || model<productType>("products",productSchema)
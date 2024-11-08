import { Model, model, models, Schema } from "mongoose";

export interface CategoryType extends Document {
   name: string;
   description?: string;
   products: []
 }

const categorySchema:Schema<CategoryType> = new Schema({
     name:{
       type: String, 
       required:true
     },
     description:{
        type: String, 
        required:true
     }
})

export const Category = (models.categories as Model<CategoryType>) || model<CategoryType>("categories",categorySchema)
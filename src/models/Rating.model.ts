import { Model, model, models, Schema, Types } from "mongoose";

interface RatingType extends Document {
       productId: Types.ObjectId; 
       reviewedBy: Types.ObjectId; 
       description: string;
       rating: string;  
       photos: string[];
       createdBy: Date;
     }

const ratingSchema:Schema<RatingType> = new Schema({
       productId:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
       },
        reviewedBy:{
          type: Schema.Types.ObjectId,
          ref: "User",
       },
       description:{
        type: String,
        required: true
       },
       rating: {
        type: String,
        required: true
       },
       photos: {
        type: [String],
        required: true
       },
       createdBy: Date.now
})

export const Rating = (models.users as Model<RatingType>) || model<RatingType>("rating",ratingSchema)
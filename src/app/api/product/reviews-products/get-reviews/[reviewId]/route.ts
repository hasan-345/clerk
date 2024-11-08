import { dbConnection } from "@/lib/dbConfig";
import { Product } from "@/models/Product.model";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest,{params}:{params:{reviewId:string}}) {
   await dbConnection();

   try { 
         
        const reviewedId = params.reviewId;
 
        const review = await Product.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(reviewedId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "reviewedBy",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            }
        ])

        if (!review) {
            return Response.json({success: false,message: "Error for finding review"},{status:404});
        }

        return Response.json({success: true,message: "Successfully got review.",review},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
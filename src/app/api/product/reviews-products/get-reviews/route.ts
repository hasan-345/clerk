import { dbConnection } from "@/lib/dbConfig";
import { Rating } from "@/models/Rating.model";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
   await dbConnection();

   try { 
 
        const reviews = await Rating.find().sort({createdBy: -1}).populate({
            path: "reviewedBy", 
            select: "firstName photo"
        });;

        if (!reviews) {
            return Response.json({success: false,message: "Error for finding reviews"},{status:404});
        }

        return Response.json({success: true,message: "Successfully got all reviews",reviews},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
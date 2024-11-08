import { dbConnection } from "@/lib/dbConfig";
import { Rating } from "@/models/Rating.model";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function DELETE(request:NextRequest,{params}:{params:{reviewId:string}}) {
   await dbConnection();
 
   try { 

        const { userId } = getAuth(request);
        const reviewedId = params.reviewId

        if (!userId) {
            return Response.json(
            { success: false, message: "Unauthorized"},
            { status: 401 }
            );
        }
 
        const user = await clerkClient.users.getUser(userId);
        const userDetails = await User.findOne({clerkId: user.id});
        if (!userDetails) {
            return Response.json({success: false, message: "User is not fetched"})
        }
        
        await Rating.findByIdAndDelete(reviewedId)

        return Response.json({success: true, message: "Successfully deleted review of product"},{status:200})

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
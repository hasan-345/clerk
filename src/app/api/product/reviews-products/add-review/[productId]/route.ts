import { dbConnection } from "@/lib/dbConfig";
import { Rating } from "@/models/Rating.model";
import { User } from "@/models/User.model";
import { ratingSchema } from "@/Schema/Rating";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest,{params}:{params:{productId:string}}) {
   await dbConnection();
 
   try { 

        const { userId } = getAuth(request);
        const productId = params.productId

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

        const productDetails = await request.json();
        
        const {description,rating,photos} = ratingSchema.parse(productDetails);

        const rate = new Rating({
          description, rating, photos, productId, reviewedBy: userDetails._id
        })

        const reviews = await rate.save();

        if (!reviews) {
          return Response.json({success: false, message: "Failed to add review"},{status:500})
        }

        const checkValidateReviewed = await Rating.findById(reviews._id)

        return Response.json({success: true, message: "Successfully added review",checkValidateReviewed},{status:200})

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
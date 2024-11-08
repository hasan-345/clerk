import { dbConnection } from "@/lib/dbConfig";
import { Cart } from "@/models/Cart.model";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest,{params}:{params:{productId:string}}) {
   await dbConnection();

   try { 
        const productId = params.productId

        const { userId } = getAuth(request);

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

        const {quantity} = await request.json();

        const cart = await Cart.findOneAndUpdate(
         { userId: new Types.ObjectId(userDetails._id), products: {$elemMatch: {productId: new Types.ObjectId(productId)}} },
         {$set:{ "products.$.quantity": quantity }},
         { new: true }
        )

        if (!cart) {
            return Response.json({success: false, message: "Cart Product is not updated"})
        }

        return Response.json({success: true,message: "Successfully created product",cart},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
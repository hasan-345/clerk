import { dbConnection } from "@/lib/dbConfig";
import { Cart } from "@/models/Cart.model";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function DELETE(request:NextRequest,{params}:{params:{productId:string}}) {
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
            return Response.json({success: false, message: "User is not fetched"},{status: 404})
        }
        
        const cartProducts = await Cart.findOneAndUpdate({userId: new Types.ObjectId(userDetails._id)},
        { $pull: {
          products: {
            productId: new Types.ObjectId(productId)
          }
        }},
        {
          new: true
        })

        if (!cartProducts) {
          return Response.json({success: false, message: "Product is not deleted or found"},{status:500})
        }

        return Response.json({success: true,message: "Successfully cart product deleted",cartProducts},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
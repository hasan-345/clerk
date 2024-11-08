import { dbConnection } from "@/lib/dbConfig";
import { Cart } from "@/models/Cart.model";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
   await dbConnection();

   try { 

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
        
        const cartProducts = await Cart.aggregate([
            {$match: {userId: new Types.ObjectId(userDetails._id)}},
            { $unwind: "$products" },
            { $lookup:{
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails"
            } },
            {
                $unwind: {
                    path: "$productDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: {$first: "$userId"},
                    products: {
                        $push:{
                            productId: "$products.productId",
                            quantity: "$products.quantity",
                            productDetails: "$productDetails"
                        }
                    }
                }
            },
            {
                $project: {
                    userId: 1,
                    products: {
                        $map:{
                            input: "$products",
                            as: "product", //parameter
                            in:{
                                productId: "$$product.productId",
                                quantity: "$$product.quantity",
                                name: "$$product.productDetails.name",
                                price: "$$product.productDetails.price",
                                photo: "$$product.productDetails.photos[0]"
                            }
                        }
                    }
                }
            }
        ])

        if (!cartProducts) {
            return Response.json({success: false,message: "No cart found"},{status:404});
        }
       
        return Response.json({success: true,message: "Successfully got all cart products",cartProducts},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
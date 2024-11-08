import { dbConnection } from "@/lib/dbConfig";
import { Cart } from "@/models/Cart.model";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
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

        const {quantity,productId} = await request.json();

        const checkCart = await Cart.findOne({userId: new Types.ObjectId(userDetails._id)})

        if (checkCart) {
            
            const checkAlreadyAdded = await Cart.findOne({userId: new Types.ObjectId(userDetails._id),
                products: {$elemMatch: {productId: new Types.ObjectId(productId)}}
            })

            if (checkAlreadyAdded) {
                return Response.json({success: true,message: "Product is already added"},{status:404});
            }

            const cart = await Cart.findOneAndUpdate({userId: new Types.ObjectId(userDetails._id)},{
                $push:{
                    products: {productId: new Types.ObjectId(productId), quantity: quantity || 1
                    }
                }
            },{
                new: true
            })

            return Response.json({success: true,message: "Successfully added product in cart",cart},{status:200});

        }

        const cart = new Cart({
            userId: userDetails._id,
            products: [
                {
                    productId: new Types.ObjectId(productId),
                    quantity: quantity || 1
                }
            ]
        })

        const newCart = await cart.save();

        if (!newCart) {
            return Response.json({success: false, message: "unexpected error to add cart product"},{status:500})
        }

        const validateProduct = await Cart.findById(newCart?._id) 

        if (!validateProduct) {
            return Response.json({success: false, message: "product is not found in cart"},{status:500})
        }

        return Response.json({success: true,message: "Successfully created product",validateProduct},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
import { dbConnection } from "@/lib/dbConfig";
import { Product } from "@/models/Product.model";
import { User } from "@/models/User.model";
import { productSchema } from "@/Schema/ProductSchema";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest,{params}:{params:{productId:string}}) {
   await dbConnection();

   try { 
         
        const productId = params.productId;
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

        if (userDetails.role == "Buyer") {
            return Response.json({success: false, message: "Buyer can't upload items"})
        }

        const productDetails = await request.json();
        
        const {name,price,discountPrice,description,photos,stock,category} = productSchema.parse(productDetails);

        const product = await Product.findByIdAndUpdate(productId,{
            $set:{
                name,
                price,
                discountPrice,
                description,
                photos,
                stock,
                category
            }
            },{
            new:true
        });

        return Response.json({success: true,message: "Successfully updated product",product},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
import { dbConnection } from "@/lib/dbConfig";
import { Product } from "@/models/Product.model";
import { User } from "@/models/User.model";
import { productSchema } from "@/Schema/ProductSchema";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

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

        console.log(userDetails);
        
        if (userDetails.role == "Buyer") {
            return Response.json({success: false, message: "Buyer can't upload items"})
        }

        const productDetails = await request.json();
        console.log(productDetails)
        
        const {name,price,discountPrice,description,photos,stock,category} = productSchema.parse(productDetails);

        const uploadedPhotos: string[]  = [];
        
        for(const photo of photos) {
            const uploadResponse = await cloudinary.uploader.upload(photo, {
              folder: "products",
            });

            if (!uploadResponse) {
                return Response.json({success: false,message: "Failed to upload images in cloudinary"},{status:500});
            }

            uploadedPhotos.push(uploadResponse.secure_url);
          }

          console.log(uploadedPhotos)

        const product = new Product({
            name,
            price,
            discountPrice,
            description,
            photos: uploadedPhotos,
            stock,
            category 
        })

        const newProduct = await product.save();

        if (!newProduct) {
            return Response.json({success: false,message: "Failed to upload product"},{status:500});
        }

        const validProduct = await Product.findById(newProduct._id)
        
        console.log(validProduct);
        
        return Response.json({success: true,message: "Successfully created product.",validProduct},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
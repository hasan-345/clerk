import { dbConnection } from "@/lib/dbConfig";
import { Product } from "@/models/Product.model";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest,{params}:{params:{productId:string}}) {
   await dbConnection();

   try { 
         
        const productId = params.productId;
 
        const product = await Product.findById(productId);

        if (!product) {
            return Response.json({success: false,message: "Error for finding Product"},{status:404});
        }

        return Response.json({success: true,message: "Successfully updated product",product},{status:200});

        } catch (error) {
          return Response.json({success: false, message: "unexpected error" + error},{status:500})
        }
}
import { dbConnection } from "@/lib/dbConfig";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
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
        const {address,phoneNumber,firstName,lastName,photo,email} = await request.json(); 

        const userUpdate = await User.findOneAndUpdate({clerkId: user.id},{
            $set: {
                address,phoneNumber,firstName,lastName,photo,email
            }
        },{
            new: true
        })

        if (!userUpdate) {
            return Response.json({success: false, message: "Invalid username"},{status:404})
        }
        
        return Response.json({success: true, message: "Successfully added",userUpdate})

    } catch (error) {
        console.log("Error while changing state of accept messages",error);
        return Response.json({success: false, message: "Failed to change state of accept message" + error},{status: 500})
    }
}
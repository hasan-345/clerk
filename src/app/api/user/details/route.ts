import { dbConnection } from "@/lib/dbConfig";
import { User } from "@/models/User.model";
import { details } from "@/Schema/Details";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    await dbConnection();

    try {

        const { userId } = getAuth(request);

        if (!userId) {
            return Response.json(
              { success: false, message: "Unauthorized" },
              { status: 401 }
            );
          }

        const user = await clerkClient.users.getUser(userId);  

        const detailedUser = await request.json(); 
        const {address,phoneNumber} = details.parse(detailedUser);
        
        const userFind = await User.findOneAndUpdate({clerkId: user.id},{
            address, phoneNumber
        },{
            new: true
        });

        return Response.json({success: true, message: "Successfully added",userFind})

    } catch (error) {
        console.log("Error while changing state of accept messages",error);
        return Response.json({success: false, message: "Failed to change state of accept message" + error},{status: 500})
    }
}
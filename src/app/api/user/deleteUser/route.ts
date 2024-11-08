import { dbConnection } from "@/lib/dbConfig";
import { User } from "@/models/User.model";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function DELETE(request:NextRequest) {
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
       
        await User.deleteOne({clerkId: user.id})

        return Response.json({success: true, message: "Successfully delete"})

    } catch (error) {
        console.log("Error while changing state of accept messages",error);
        return Response.json({success: false, message: "Failed to change state of accept message" + error},{status: 500})
    }
}
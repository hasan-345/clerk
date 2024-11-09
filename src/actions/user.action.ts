"use server";

import { dbConnection } from "@/lib/dbConfig";
import { User } from "@/models/User.model";

export async function createUser(user:any) {
    try {
        await dbConnection()

        const userModel = new User(user)

        await userModel.save()

        console.log(userModel)

        return JSON.parse(JSON.stringify(userModel))

    } catch (error) {
        console.log(error)
    }
}
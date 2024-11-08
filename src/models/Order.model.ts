import { Model, model, models, Schema, Types } from "mongoose";

interface orderItem {
    product: Types.ObjectId,
    quantity: number
}

interface orderType extends Document{
    user: Types.ObjectId;
    items:orderItem[];
    totalAmount: number;
    shippingAddress: string;
    status: string;
    createdBy: Date; 
}

const orderSchema:Schema<orderType> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items:[{
        product:{
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity:{
            type: Number,
            default: 1,
            min: 1
        }
    }],
    totalAmount: {
            type: Number,
            required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",  
    },
    createdBy:{
        type: Date,
        default: Date.now
    }
})

export const Order = (models.orders as Model<orderType>) || model<orderType>("orders",orderSchema)
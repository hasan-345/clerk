import { Model, model, models, Schema, Types, Document } from "mongoose";

interface OrderItem {
    productId: Types.ObjectId;
    quantity: number; 
} 

interface CartType extends Document {
    userId: Types.ObjectId; 
    products: OrderItem[];
    createdBy: Date; 
}

const cartSchema: Schema<CartType> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
    }],
    createdBy: {
        type: Date,
        default: Date.now,
    },
});

       
export const Cart = (models.Cart as Model<CartType>) || model<CartType>("Cart", cartSchema); 

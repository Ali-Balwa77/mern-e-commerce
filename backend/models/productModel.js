import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type: String , reuired: true, unique: true},
        slug:{type: String , reuired: true, unique: true},
        image:{type: String , reuired: true},
        brand:{type: String , reuired: true},
        category:{type: String, reuired: true},
        description:{type: String , reuired: true},
        price:{type:Number , reuired: true},
        countInStock:{type:Number , reuired: true},
        rating:{type:Number , reuired: true},
        numReviews:{type:Number , reuired: true},
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product',productSchema);

export default Product;
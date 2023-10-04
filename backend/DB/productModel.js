import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price: String,
    category: String,
    company: String,
    image:Object
});

const productModel = mongoose.model("products",productSchema);
export default productModel
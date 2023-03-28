import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
    }
})
export default mongoose.model("Product", productSchema)
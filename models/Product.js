import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      maxLength: 60,
    },
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    brand: {
      type: String,
      required: true,
      maxLength: 100,
    },
    price: {
      type: [Number],
      required: true,
      maxLength: 100,
    },
    rating: {
      type: String,
      required: false,
      maxLength: 5,
    },
    numReview: {
      type: Number,
      required: false,
      maxLength: 20,
    },
    coutnInStocks: {
      type: Number,
      required: true,
      maxLength: 20,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

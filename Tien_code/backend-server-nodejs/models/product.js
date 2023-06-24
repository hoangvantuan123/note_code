const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const productSchema = new Schema({
  name_image: {
    type: String,
  },
  image_url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  name: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  availability: String,
  rating: Number,
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.statics.uploadAndSaveImage = async function (postId, file) {
  try {
    const result = await cloudinary.uploader.upload(file.path);

    const post = await this.findByIdAndUpdate(
      postId,
      {
        name_image: file.name_image,
        image_url: result.secure_url,
        cloudinary_id: result.public_id,
      },
      { new: true }
    );

    return post;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);

    // Throw error to be handled by the caller
    throw new Error("Error uploading image to Cloudinary");
  }
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

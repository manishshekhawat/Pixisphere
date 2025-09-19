const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: Date
});

const photographerSchema = new mongoose.Schema({
  id:{type:Number},
  name: { type: String, required: true },
  location: String,
  price: Number,
  rating: Number,
  styles: [String],
  tags: [String],
  bio: String,
  profilePic: String,
  portfolio: [String],
  reviews: [reviewSchema]
});

module.exports = mongoose.model("Photographer", photographerSchema);

const mongoose = require("mongoose");

const bicepsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const BicepsPost = mongoose.model("BicepsPost", bicepsPostSchema);
module.exports = BicepsPost;

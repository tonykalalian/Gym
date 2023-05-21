const mongoose = require("mongoose");

const quadsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const QuadsPost = mongoose.model("QuadsPost", quadsPostSchema);
module.exports = QuadsPost;

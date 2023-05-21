const mongoose = require("mongoose");

const tricepsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const TricepsPost = mongoose.model("TricepsPost", tricepsPostSchema);
module.exports = TricepsPost;

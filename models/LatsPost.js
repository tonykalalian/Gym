const mongoose = require("mongoose");

const latsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const LatsPost = mongoose.model("LatsPost", latsPostSchema);
module.exports = LatsPost;

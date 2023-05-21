const mongoose = require("mongoose");
const hamstringPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const HamstringPost = mongoose.model("HamstringPost", hamstringPostSchema);
module.exports = HamstringPost;

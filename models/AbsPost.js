const mongoose = require("mongoose");
const absPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const AbsPost = mongoose.model("AbsPost", absPostSchema);
module.exports = AbsPost;

const mongoose = require("mongoose");

const chestPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const ChestPost = mongoose.model("ChestPost", chestPostSchema);
module.exports = ChestPost;

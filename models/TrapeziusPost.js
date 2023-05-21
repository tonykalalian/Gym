const mongoose = require("mongoose");

const trapeziusPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const TrapeziusPost = mongoose.model("TrapeziusPost", trapeziusPostSchema);
module.exports = TrapeziusPost;

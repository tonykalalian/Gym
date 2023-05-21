const mongoose = require("mongoose");

const obliquesPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const ObliquesPost = mongoose.model("ObliquesPost", obliquesPostSchema);
module.exports = ObliquesPost;

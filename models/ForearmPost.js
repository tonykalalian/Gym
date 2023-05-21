const mongoose = require("mongoose");

const forearmPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const ForearmPost = mongoose.model("ForearmPost", forearmPostSchema);
module.exports = ForearmPost;

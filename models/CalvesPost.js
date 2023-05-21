const mongoose = require("mongoose");

const calvesPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const CalvesPost = mongoose.model("CalvesPost", calvesPostSchema);
module.exports = CalvesPost;

const mongoose = require("mongoose");

const glutesPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const GlutesPost = mongoose.model("GlutesPost", glutesPostSchema);
module.export = GlutesPost;

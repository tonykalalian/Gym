const mongoose = require("mongoose");

const deltoidsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const DeltoidsPost = mongoose.model("DeltoidsPost", deltoidsPostSchema);
module.exports = DeltoidsPost;

const mongoose = require("mongoose");

const adductorsPostSchema = new mongoose.Schema({
  thumbUrl: String,
  postLink: String,
  category: String,
  categoryLink: String,
  title: String,
  summary: String,
  author: String,
  datePublished: String,
});
const AdductorsPost = mongoose.model("AdductorsPost", adductorsPostSchema);
module.exports = AdductorsPost;

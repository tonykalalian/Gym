require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/auth", authRoutes);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
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
    const tricepsPostSchema = new mongoose.Schema({
      thumbUrl: String,
      postLink: String,
      category: String,
      categoryLink: String,
      title: String,
      summary: String,
      author: String,
      datePublished: String,
    });
    const TricepsPost = mongoose.model("TricepsPost", tricepsPostSchema);
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
    const quadsPostSchema = new mongoose.Schema({
      thumbUrl: String,
      postLink: String,
      category: String,
      categoryLink: String,
      title: String,
      summary: String,
      author: String,
      datePublished: String,
    });
    const QuadsPost = mongoose.model("QuadsPost", quadsPostSchema);
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
    const latsPostSchema = new mongoose.Schema({
      thumbUrl: String,
      postLink: String,
      category: String,
      categoryLink: String,
      title: String,
      summary: String,
      author: String,
      datePublished: String,
    });
    const LatsPost = mongoose.model("LatsPost", latsPostSchema);
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
    const bicepsPostSchema = new mongoose.Schema({
      thumbUrl: String,
      postLink: String,
      category: String,
      categoryLink: String,
      title: String,
      summary: String,
      author: String,
      datePublished: String,
    });
    const BicepsPost = mongoose.model("BicepsPost", bicepsPostSchema);
    const savePostsToDB = async (model, posts) => {
      try {
        await model.deleteMany({});
        for (const post of posts) {
          await model.create(post);
        }
        console.log("Posts saved to the database successfully!");
      } catch (error) {
        console.error("Error saving posts to the database", error);
      }
    };
    const adductorsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(AdductorsPost, adductorsPosts);
    const hamstringPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(HamstringPost, hamstringPosts);
    const quadsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(QuadsPost, quadsPosts);
    const obliquesPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(ObliquesPost, obliquesPosts);
    const latsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(LatsPost, latsPosts);
    const bicepsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(BicepsPost, bicepsPosts);
    ///for glutes
    const glutesPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(GlutesPost, glutesPosts);

    const chestPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(ChestPost, chestPosts);
    const trapeziusPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(TrapeziusPost, trapeziusPosts);
    const forearmPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(ForearmPost, forearmPosts);
    const calvesPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(CalvesPost, calvesPosts);
    const deltoidsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(DeltoidsPost, deltoidsPosts);
    const tricepsPosts = [
      {
        thumbUrl: "images/sif.PNG",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/home-1.png",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(TricepsPost, tricepsPosts);
    const absPosts = [
      {
        thumbUrl: "images/exercises/abs/1.jpg",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/exercises/abs/2.jpg",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/exercises/abs/3.jpg",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/exercises/abs/4.jpg",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
      {
        thumbUrl: "images/exercises/abs/5.jpg",
        postLink: "",
        category: "Fitness",
        categoryLink: "",
        title: "Chest Workout",
        summary: "This is a summary of the chest workout.",
        author: "Tony",
        datePublished: "20",
      },
    ];
    savePostsToDB(AbsPost, absPosts);

    app.get("/home", (req, res) => {
      res.render("home");
    });
    app.get("/", (req, res) => {
      res.render("index");
    });
    app.get("/login", (req, res) => {
      res.render("login");
    });
    app.get("/bmr", (req, res) => {
      res.render("bmr");
    });
    app.get("/registration", (req, res) => {
      res.render("registration");
    });
    app.get("/plans", (req, res) => {
      res.render("plans");
    });
    app.get("/chest", async (req, res) => {
      try {
        const posts = await ChestPost.find();
        res.render("chest", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/abs", async (req, res) => {
      try {
        const posts = await AbsPost.find();
        res.render("abs", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/adductors", async (req, res) => {
      try {
        const posts = await AdductorsPost.find();
        res.render("adductors", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/biceps", async (req, res) => {
      try {
        const posts = await BicepsPost.find();
        res.render("biceps", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/glutes", async (req, res) => {
      try {
        const posts = await GlutesPost.find();
        res.render("glutes", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/trapezius", async (req, res) => {
      try {
        const posts = await TrapeziusPost.find();
        res.render("trapezius", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/forearm", async (req, res) => {
      try {
        const posts = await ForearmPost.find();
        res.render("forearm", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/calves", async (req, res) => {
      try {
        const posts = await CalvesPost.find();
        res.render("calves", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/triceps", async (req, res) => {
      try {
        const posts = await TricepsPost.find();
        res.render("triceps", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/deltoids", async (req, res) => {
      try {
        const posts = await DeltoidsPost.find();
        res.render("deltoids", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/quads", async (req, res) => {
      try {
        const posts = await QuadsPost.find();
        res.render("quads", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/obliques", async (req, res) => {
      try {
        const posts = await ObliquesPost.find();
        res.render("obliques", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/lats", async (req, res) => {
      try {
        const posts = await LatsPost.find();
        res.render("lats", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/hamstring", async (req, res) => {
      try {
        const posts = await HamstringPost.find();
        res.render("hamstring", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

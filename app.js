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
// =============ALL MODELS FOR MUSCLES==============
const ChestPost = require("./models/ChestPost");
const AbsPost = require("./models/AbsPost");
const AdductorsPost = require("./models/AdductorsPost");
const BicepsPost = require("./models/BicepsPost");
const TrapeziusPost = require("./models/TrapeziusPost");
const ForearmPost = require("./models/ForearmPost");
const CalvesPost = require("./models/CalvesPost");
const DeltoidsPost = require("./models/DeltoidsPost");
const LatsPost = require("./models/LatsPost");
const HamstringPost = require("./models/HamstringPost");
const QuadsPost = require("./models/QuadsPost");
const TricepsPost = require("./models/TricepsPost");
const ObliquesPost = require("./models/ObliquesPost");
const GlutesPost = require("./models/GlutesPost");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

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
    app.get("/food", (req, res) => {
      res.render("food");
    });
    app.get("/diet", (req, res) => {
      res.render("diet");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

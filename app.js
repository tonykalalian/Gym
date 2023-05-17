require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve static files from the "public" directory
app.set("view engine", "ejs");
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define the User schema and model
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    });

    const User = mongoose.model("User", userSchema);
    // Define the ChestPost schema and model
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

    // Function to save posts to the database
    const savePostsToDB = async (model, posts) => {
      try {
        // Delete any existing documents in the specified collection to start fresh
        await model.deleteMany({});

        // Iterate over each post and create a new document in the specified collection
        for (const post of posts) {
          await model.create(post);
        }

        console.log("Posts saved to the database successfully!");
      } catch (error) {
        console.error("Error saving posts to the database", error);
      }
    };

    // Assuming you have already defined ChestPost and AbsPost models

    // Usage example for saving chest posts
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

    // Usage example for saving abs posts
    // const absPosts = [
    //   {
    //     thumbUrl: "images/exercises/abs/1.jpg",
    //     postLink: "",
    //     category: "Fitness",
    //     categoryLink: "",
    //     title: "Chest Workout",
    //     summary: "This is a summary of the chest workout.",
    //     author: "Tony",
    //     datePublished: "20",
    //   },
    //   {
    //     thumbUrl: "images/exercises/abs/2.jpg",
    //     postLink: "",
    //     category: "Fitness",
    //     categoryLink: "",
    //     title: "Chest Workout",
    //     summary: "This is a summary of the chest workout.",
    //     author: "Tony",
    //     datePublished: "20",
    //   },
    //   {
    //     thumbUrl: "images/exercises/abs/3.jpg",
    //     postLink: "",
    //     category: "Fitness",
    //     categoryLink: "",
    //     title: "Chest Workout",
    //     summary: "This is a summary of the chest workout.",
    //     author: "Tony",
    //     datePublished: "20",
    //   },
    //   {
    //     thumbUrl: "images/exercises/abs/4.jpg",
    //     postLink: "",
    //     category: "Fitness",
    //     categoryLink: "",
    //     title: "Chest Workout",
    //     summary: "This is a summary of the chest workout.",
    //     author: "Tony",
    //     datePublished: "20",
    //   },
    //   {
    //     thumbUrl: "images/exercises/abs/5.jpg",
    //     postLink: "",
    //     category: "Fitness",
    //     categoryLink: "",
    //     title: "Chest Workout",
    //     summary: "This is a summary of the chest workout.",
    //     author: "Tony",
    //     datePublished: "20",
    //   },
    // ];
    // savePostsToDB(AbsPost, absPosts);
    // Function to save posts to the database

    // const newPost1 = new ChestPost({
    //   thumbUrl: "images/sif.PNG",
    //   postLink: "",
    //   category: "Fitness",
    //   categoryLink: "",
    //   title: "Chest Workout",
    //   summary: "This is a summary of the chest workout.",
    //   author: "Tony",
    //   datePublished: "20",
    // });
    // newPost1.save();

    app.post("/api/auth/register", async (req, res) => {
      try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
          username,
          email,
          password,
        });

        // Save the user to the database
        await newUser.save();

        // Redirect the user to the login page
        res.redirect("/registration");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Login route
    app.post("/api/auth/login", async (req, res) => {
      try {
        const { username, password } = req.body;

        // Find the user by their username
        const user = await User.findOne({ username });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check if the entered password matches the stored password
        if (password !== user.password) {
          return res.status(401).json({ message: "Invalid password" });
        }

        // Redirect the logged-in user to the home page
        res.redirect("/home");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/home", (req, res) => {
      res.render("home");
    });
    // Serve the registration form
    app.get("/", (req, res) => {
      res.render("index");
    });
    // Serve the login form
    app.get("/login", (req, res) => {
      res.render("login");
    });
    app.get("/bmr", (req, res) => {
      res.render("bmr");
    });
    // Serve the login form
    app.get("/registration", (req, res) => {
      res.render("registration");
    });
    app.get("/plans", (req, res) => {
      res.render("plans");
    });
    // Assuming you have already connected to MongoDB and defined the ChestPost model
    app.get("/chest", async (req, res) => {
      try {
        // Fetch all the chest posts from the database
        const posts = await ChestPost.find();

        res.render("chest", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });
    app.get("/abs", async (req, res) => {
      try {
        // Fetch all the abs posts from the database
        const posts = await AbsPost.find();

        res.render("abs", { posts });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Helper function to save posts to the database
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

    // Routes
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

    // Dynamic routes for different muscle groups
    const muscleRoutes = [
      { path: "/chest", model: ChestPost },
      { path: "/abs", model: AbsPost },
      { path: "/adductors", model: AdductorsPost },
      { path: "/biceps", model: BicepsPost },
      { path: "/glutes", model: GlutesPost },
      { path: "/trapezius", model: TrapeziusPost },
      { path: "/forearm", model: ForearmPost },
      { path: "/calves", model: CalvesPost },
      { path: "/triceps", model: TricepsPost },
      { path: "/deltoids", model: DeltoidsPost },
      { path: "/quads", model: QuadsPost },
      { path: "/obliques", model: ObliquesPost },
      { path: "/lats", model: LatsPost },
      { path: "/hamstring", model: HamstringPost },
    ];

    muscleRoutes.forEach((route) => {
      app.get(route.path, async (req, res) => {
        try {
          const posts = await route.model.find();
          res.render(route.path.substr(1), { posts });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "An error occurred" });
        }
      });
    });

    app.get("/food", (req, res) => {
      res.render("food");
    });

    app.get("/diet", (req, res) => {
      res.render("diet");
    });

    app.get("/product", (req, res) => {
      res.render("product");
    });

    app.get("/checkout", (req, res) => {
      res.render("checkout");
    });

    app.get("/team", (req, res) => {
      res.render("team");
    });

    app.post("/news", (req, res) => {
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      let data = {
        members: [
          {
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
              FNAME: fname,
              LNAME: lname,
            },
          },
        ],
      };
      const jsonData = JSON.stringify(data);
      const url = process.env.URL;

      const options = {
        method: "POST",
        auth: process.env.LIST,
      };
      const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
          res.render("success");
        } else {
          res.render("failure");
        }
        response.on("data", (data) => {
          console.log(JSON.parse(data));
        });
      });

      request.write(jsonData);
      request.end();
    });

    app.post("/failure", (req, res) => {
      res.redirect("/news");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Models for muscle posts
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

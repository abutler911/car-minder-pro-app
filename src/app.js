require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db.js");
const Vehicle = require("./models/vehicle");

//MIDDLEWARE
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB();
//ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/vehicles/new", (req, res) => {
  res.render("newVehicle");
});

app.post("/vehicles", async (req, res) => {
  try {
    const { year, make, model, mileage } = req.body;
    const newVehicle = new Vehicle({ year, make, model, mileage });

    await newVehicle.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving vehicle to the database", error);
    res.status(500).send("Error saving vehicle to the database");
  }
});

app.listen(port, () => {
  console.log(`Server is up on localhost:${port}`);
});

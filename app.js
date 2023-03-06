const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
mongoose.connect(process.env.MONGO_URL);

const database = mongoose.connection;

database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.use("/api", routes);

// Serve the frontend files as static files
app.use(
  express.static(path.join("./view/public/index.html", "frontend/build"))
);

// Catch all other requests and return the frontend index.html file
app.get("*", (req, res) => {
  res.sendFile(
    path.join("./view/public/index.html", "frontend/build/index.html")
  );
});

app.listen(5000, () => {
  console.log("listenig to 5000");
});

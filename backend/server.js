const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const roomsRoutes = require("./routes/roomsRoutes");
const roomCategoriesRoutes = require("./routes/roomCategoriesRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/admin/rooms", roomsRoutes);
app.use("/api/admin/categories", roomCategoriesRoutes);
app.use("/api/admin/features", featuresRoutes);
app.use("/api/admin/orders", ordersRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port 4000 and connected to the DB.");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

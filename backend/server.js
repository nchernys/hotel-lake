const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const roomsRoutes = require("./routes/roomsRoutes");
const roomCategoriesRoutes = require("./routes/roomCategoriesRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentGateway = require("./routes/paymentGateway");
const stripeWebhook = require("./routes/stripeWebhooks");

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/stripe-webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());

app.use("/api/admin/rooms", roomsRoutes);
app.use("/api/admin/categories", roomCategoriesRoutes);
app.use("/api/admin/features", featuresRoutes);
app.use("/api/admin/orders", ordersRoutes);
app.use("/api/payment", paymentGateway);

mongoose
  .connect(
    "mongodb+srv://nchernys:Natageos=77@hoteldb.umte6qd.mongodb.net/?retryWrites=true&w=majority&appName=hotelDB"
  )
  .then(() => {
    app.listen(process.env.PORT || 4002, () => {
      console.log("Listening on port 4002 and connected to the DB.");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "../react_calendar/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../react_calendar/build", "index.html"));
});

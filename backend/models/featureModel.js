const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const featureSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);

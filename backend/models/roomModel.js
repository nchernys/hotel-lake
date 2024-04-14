const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    features: {
      type: Schema.Types.ObjectId,
      ref: "Feature",
    },

    pictures: {
      type: [String],
    },
  },
  { timestamps: true }
);

roomSchema.pre("save", function (next) {
  this.pictures = this.pictures.map((path) => path.replace(/\\/g, "/"));
  next();
});

module.exports = mongoose.model("Room", roomSchema);

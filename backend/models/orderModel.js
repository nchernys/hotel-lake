const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    guestFirstName: {
      type: String,
    },
    guestLastName: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    dateMoveIn: {
      type: String,
    },
    dateMoveOut: {
      type: String,
    },
    totalToPay: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

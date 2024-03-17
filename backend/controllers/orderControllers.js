const Order = require("../models/orderModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("categoryId")
      .populate("roomId")
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewOrder = async (req, res) => {
  const {
    guestFirstName,
    guestLastName,
    totalToPay,
    categoryId,
    roomId,
    dateMoveIn,
    dateMoveOut,
    numOfNights,
  } = req.body;

  try {
    const newOrder = await Order.create({
      guestFirstName,
      guestLastName,
      totalToPay,
      categoryId,
      roomId,
      dateMoveIn,
      dateMoveOut,
      numOfNights,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getThisOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const thisOrder = Room.findById({ _id: id });
    res.status(200).json(thisOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThisOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const thisOrder = await Order.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Item was deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateThisOrder = async (req, res) => {
  const { id } = req.params;
  const {
    guestFirstName,
    guestLastName,
    totalToPay,
    categoryId,
    roomId,
    dateMoveIn,
    dateMoveOut,
    numOfNights,
  } = req.body;
  try {
    const thisOrder = await Room.findByIdAndUpdate(
      id,
      {
        guestFirstName,
        guestLastName,
        totalToPay,
        categoryId,
        roomId,
        dateMoveIn,
        dateMoveOut,
        numOfNights,
      },
      { new: true }
    );

    thisOrder.save();
    res.status(200).json(thisOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  addNewOrder,
  getThisOrder,
  deleteThisOrder,
  updateThisOrder,
};

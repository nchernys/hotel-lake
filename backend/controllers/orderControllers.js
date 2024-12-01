const Order = require("../models/orderModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",

  auth: {
    user: "natalia@nchernysheva.com ",
    pass: "Natageos=77",
  },
});

const sendEmail = async () => {
  try {
    await transporter.sendMail({
      from: "natalia@nchernysheva.com",
      to: "natasha.e.chernysheva@gmail.com",
      subject: "HOTEL PROJECT: New order created",
      text: "New order created",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("roomId").exec();

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
    roomId,
    dateMoveIn,
    dateMoveOut,
  } = req.body;

  await sendEmail();
  try {
    const newOrder = await Order.create({
      guestFirstName,
      guestLastName,
      totalToPay,
      roomId,
      dateMoveIn,
      dateMoveOut,
    });

    console.log("CREATED NEW ORDER");
    res.status(200).json(newOrder);
  } catch (error) {
    console.log("FAILED TO CREATE NEW ORDER", error);
    return res.status(400).json({ error: error.message });
  }
};

const getThisOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const thisOrder = await Order.findById({ _id: id }).populate("roomId");
    res.status(200).json(thisOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThisOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (
      id === "65f55b69489c98a37c525e3c" ||
      id === "65f56711fa0c8fe0257dabc6" ||
      id === "65f61c4557af69fafcc8fcdc"
    ) {
      res.status(200).json({
        message: "no-delete",
      });
    } else {
      const thisOrder = await Order.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: "Item was deleted." });
    }
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
  } = req.body;
  try {
    if (
      id === "65f55b69489c98a37c525e3c" ||
      id === "65f56711fa0c8fe0257dabc6" ||
      id === "65f61c4557af69fafcc8fcdc"
    ) {
      res.status(200).json({
        message: "no-edit",
      });
    } else {
      const thisOrder = await Order.findByIdAndUpdate(
        id,
        {
          guestFirstName,
          guestLastName,
          totalToPay,
          categoryId,
          roomId,
          dateMoveIn,
          dateMoveOut,
        },
        { new: true }
      );

      thisOrder.save();
      res.status(200).json(thisOrder);
    }
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

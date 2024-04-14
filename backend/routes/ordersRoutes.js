const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  addNewOrder,
  getThisOrder,
  deleteThisOrder,
  updateThisOrder,
  isCompleted,
} = require("../controllers/orderControllers");

router.post("/", addNewOrder);
router.get("/", getAllOrders);
router.get("/:id", getThisOrder);
router.delete("/:id", deleteThisOrder);
router.patch("/:id", updateThisOrder);
router.patch("/completed/:id", isCompleted);

module.exports = router;

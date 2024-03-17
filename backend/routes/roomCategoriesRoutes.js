const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  addNewCategory,
  getThisCategory,
  deleteThisCategory,
  updateThisCategory,
} = require("../controllers/roomCategoriesControllers");

router.post("/", addNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getThisCategory);
router.delete("/:id", deleteThisCategory);
router.patch("/:id", updateThisCategory);

module.exports = router;

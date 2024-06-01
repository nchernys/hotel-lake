const Category = require("../models/roomCategoryModel");
const Room = require("../models/roomModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewCategory = async (req, res) => {
  const { nameCategory } = req.body;
  try {
    if (nameCategory) {
      console.log(nameCategory);
      const newCategory = await Category.create({ name: nameCategory });
      res.status(200).json(newCategory);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getThisCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const thisCategory = Category.findById({ _id: id });
    res.status(200).json(thisCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThisCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const roomsByCategory = await Room.find({ category: id });
    if (roomsByCategory.length > 0) {
      console.log(roomsByCategory.length);
      res.status(200).json({
        message: "no-delete",
      });
    } else {
      console.log("No rooms found in this category.");
      const thisCategory = await Category.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: "Category deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateThisCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const thisCategory = Category.findById({ _id: id });
    thisCategory.name = name;

    thisCategory.save();
    res.status(200).json(thisCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  addNewCategory,
  getThisCategory,
  deleteThisCategory,
  updateThisCategory,
};

const Feature = require("../models/featureModel");

const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find({});
    res.status(200).json(features);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewFeature = async (req, res) => {
  const { nameFeature } = req.body;
  try {
    const newFeature = await Feature.create({
      name: nameFeature,
    });
    res.status(200).json(newFeature);
    await newFeature.save();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThisFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const thisFeature = await Feature.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Item was deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateThisFeature = async (req, res) => {
  const { id } = req.params;

  try {
    const { name } = req.body;

    const updatedFeature = await Feature.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    await updatedFeature.save();
    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllFeatures,
  addNewFeature,
  deleteThisFeature,
  updateThisFeature,
};

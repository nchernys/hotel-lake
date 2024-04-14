const Room = require("../models/roomModel");

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    await Room.populate(rooms, { path: "category" });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addNewRoom = async (req, res) => {
  const { name, price, description, category } = req.body;
  const pictures = req.files.map((file) => file.path);
  try {
    const newRoom = await Room.create({
      name,
      price,
      description,
      category,
      pictures,
    });
    res.status(200).json(newRoom);
    await newRoom.save();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getThisRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const thisRoom = await Room.findById({ _id: id });
    res.status(200).json(thisRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteThisRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const thisRoom = await Room.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Item was deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateThisRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, description, category, price } = req.body;
    const oldPictures = req.body.oldPictures || [];
    const newPictures = req.files["newPictures"];

    console.log("OLD PICTURES BACK", oldPictures);

    let newPicturePaths = [];

    if (newPictures) {
      newPicturePaths = newPictures.map((file) => file.path);
    }
    const oldPicturesArray = Array.isArray(oldPictures)
      ? oldPictures
      : [oldPictures];

    const updatedPictures = oldPicturesArray.concat(newPicturePaths);

    const updatedFields = {
      name,
      description,
      category,
      price,
      pictures: updatedPictures,
    };

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    await updatedRoom.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRoomsByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const roomsByCategory = await Room.find({ category: id });
    console.log("ROOMS BY CAT", roomsByCategory);
    res.status(200).json(roomsByCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllRooms,
  addNewRoom,
  getThisRoom,
  deleteThisRoom,
  updateThisRoom,
  getRoomsByCategory,
};

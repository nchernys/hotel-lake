const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  getAllRooms,
  addNewRoom,
  getThisRoom,
  deleteThisRoom,
  updateThisRoom,
  getRoomsByCategory,
} = require("../controllers/roomsControllers");

router.post("/", upload.array("pictures", 10), addNewRoom);
router.get("/", getAllRooms);
router.get("/:id", getThisRoom);
router.delete("/:id", deleteThisRoom);
router.patch(
  "/:id",
  upload.fields([
    { name: "oldPictures", maxCount: 10 },
    { name: "newPictures", maxCount: 10 },
  ]),
  updateThisRoom
);
router.get("/category/:id", getRoomsByCategory);

module.exports = router;

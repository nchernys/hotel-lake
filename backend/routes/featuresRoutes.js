const express = require("express");
const router = express.Router();

const {
  getAllFeatures,
  addNewFeature,
  deleteThisFeature,
  updateThisFeature,
} = require("../controllers/featureControllers");

router.post("/", addNewFeature);
router.get("/", getAllFeatures);
router.delete("/:id", deleteThisFeature);
router.patch("/:id", updateThisFeature);

module.exports = router;

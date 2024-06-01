const express = require("express");
const router = express.Router();

const { paymentPost } = require("../controllers/paymentGatewayControllers");

router.post("/", paymentPost);

module.exports = router;

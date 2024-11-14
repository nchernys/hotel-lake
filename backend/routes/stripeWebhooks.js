const express = require("express");
const { addNewOrder } = require("../controllers/orderControllers");
const stripe = require("stripe")(
  "sk_test_51PCuAZ09yFMm4KWF8rpAwEOSguaQhPL95nQjmvyFYOYCoyq8lxR8fxmZIJnAGMUu6IjZuyFeCVHpZ1pEUFhebz0N00Jzp4Nejq"
);

const router = express.Router();

const endpointSecret = "whsec_g0qhkhTlHqLknFvOPUPAlgNwVRDsrCXH";

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    console.log("WEBHOOK1");
    console.log("Signature header:", sig);
    console.log("Signature body:", request.body);

    let event;
    try {
      // The request.body must be a raw Buffer or string here
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.error("Error verifying webhook signature:", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("WEBHOOK2");

    if (event.type === "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;
      console.log("WEBHOOK3");

      const orderDetails = {
        guestFirstName: checkoutSessionCompleted.metadata.guestFirstNames,
        guestLastName: checkoutSessionCompleted.metadata.guestLastNames,
        totalToPay: checkoutSessionCompleted.amount_total / 100,
        roomId: checkoutSessionCompleted.metadata.roomIds,
        dateMoveIn: checkoutSessionCompleted.metadata.dateMoveIns,
        dateMoveOut: checkoutSessionCompleted.metadata.dateMoveOuts,
      };

      console.log("WEBHOOK", orderDetails);

      request.body = orderDetails;

      try {
        await addNewOrder(request, response);
      } catch (error) {
        console.error("Error creating order:", error.message);
      }
    } else {
      console.log(`Unhandled event type ${event.type}`);
      response.status(200).send();
    }
  }
);

module.exports = router;

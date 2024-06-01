const stripe = require("stripe")(
  "sk_test_51PCuAZ09yFMm4KWF8rpAwEOSguaQhPL95nQjmvyFYOYCoyq8lxR8fxmZIJnAGMUu6IjZuyFeCVHpZ1pEUFhebz0N00Jzp4Nejq"
);

const paymentPost = async (req, res) => {
  const { orders } = req.body;
  const lineItems = orders.map((order) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: order.roomId.name,
        description:
          "Guest Name: " +
          order.guestFirstName.toUpperCase() +
          " " +
          order.guestLastName.toUpperCase(),
      },
      unit_amount: order.roomId.price * 100,
    },
    quantity: Math.floor(
      (new Date(order.dateMoveOut).getTime() -
        new Date(order.dateMoveIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ),
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000/",
  });

  res.json({ id: session.id });
};

module.exports = {
  paymentPost,
};

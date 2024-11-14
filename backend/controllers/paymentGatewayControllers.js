const stripe = require("stripe")(
  "sk_test_51PCuAZ09yFMm4KWF8rpAwEOSguaQhPL95nQjmvyFYOYCoyq8lxR8fxmZIJnAGMUu6IjZuyFeCVHpZ1pEUFhebz0N00Jzp4Nejq"
);

const paymentPost = async (req, res) => {
  const { orders } = req.body;
  console.log(orders);
  const lineItems = orders.map((order) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: `Room Name: ${order.roomName}`,
          description:
            "Guest Name: " +
            order.guestFirstName.toUpperCase() +
            " " +
            order.guestLastName.toUpperCase() +
            ", Check-in: " +
            new Date(order.dateMoveIn).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }) +
            ", Check-out: " +
            new Date(order.dateMoveOut).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
        },
        quantity: Math.floor(
          new Date(order.dateMoveOut).getDate() -
            new Date(order.dateMoveIn).getDate()
        ),
      },
    };
  });

  const metadata = {
    guestFirstNames: orders.map((order) => order.guestFirstName).join(", "),
    guestLastNames: orders.map((order) => order.guestLastName).join(", "),
    roomIds: orders.map((order) => order.roomId).join(", "),
    dateMoveIns: orders.map((order) => order.dateMoveIn).join(", "),
    dateMoveOuts: orders.map((order) => order.dateMoveOut).join(", "),
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://hotel-project.nchernysheva.com/order/payment/success",
    cancel_url: "https://hotel-project.nchernysheva.com/orders",
    metadata: metadata,
  });

  res.json({ id: session.id });
};

module.exports = {
  paymentPost,
};

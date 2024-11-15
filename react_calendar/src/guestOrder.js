import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
const { format } = require("date-fns");

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [offerHoursLeft, setOfferHoursLeft] = useState([]);
  const [nights, setNights] = useState([]);

  useEffect(() => {
    {
      /*
    const fetchOrders = async () => {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) {
        console.log("Failed to get orders.");
      } else {
        const data = await response.json();

        const ordersWithDateObjects = data.map((order) => ({
          ...order,
          dateMoveIn: new Date(order.dateMoveIn).toDateString(),
          dateMoveOut: new Date(order.dateMoveOut).toDateString(),
        }));

        const lastOrder =
          ordersWithDateObjects[ordersWithDateObjects.length - 1];

        setOrders([lastOrder]);

        const createdAt = new Date(lastOrder.createdAt);
        let offerExpired = new Date(createdAt);
        offerExpired = offerExpired.setHours(createdAt.getHours() + 72);
        const today = new Date();
        let hoursLeft = (offerExpired - today) / (1000 * 60 * 60);
        setOfferHoursLeft(Math.round(hoursLeft));

        setNights(
          Math.floor(
            new Date(lastOrder.dateMoveOut).getDate() -
              new Date(lastOrder.dateMoveIn).getDate()
          )
        );
        console.log(lastOrder.dateMoveOut);
      }
    };

    fetchOrders();

      */
    }
    const today = new Date();
    const fetchOrders = JSON.parse(localStorage.getItem("hotel_orders")) || [];
    setOrders(fetchOrders);

    const updatedOfferHoursLeft = fetchOrders.map((order) => {
      let offerExpired = new Date(order.createdAt);
      offerExpired.setHours(offerExpired.getHours() + 72);

      let hoursLeft = (offerExpired - today) / (1000 * 60 * 60);
      return Math.round(hoursLeft);
    });

    const updatedNights = fetchOrders.map((order) => {
      const nights = Math.floor(
        (new Date(order.dateMoveOut) - new Date(order.dateMoveIn)) /
          (1000 * 60 * 60 * 24)
      );
      return nights;
    });

    setNights(updatedNights);
    setOfferHoursLeft(updatedOfferHoursLeft);
  }, []);

  const makePayment = async (index) => {
    const getOrdersToPay = orders[index];
    console.log("THIS ORDER", getOrdersToPay);

    const stripe = await loadStripe(
      "pk_test_51PCuAZ09yFMm4KWFLPN8qPcbYDQwfYQvUuLZ12qtQStdNMJoLrd4GaIQ6CjW7QnaFIbEDPXUgtsYIeIOYkClLQk500nYejFsni"
    );

    const body = {
      orders: [getOrdersToPay],
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("/api/payment/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const handleDeleteRoomReservation = (roomIndex) => {
    let ordersFromLocalStorage = JSON.parse(
      localStorage.getItem("hotel_orders")
    );
    if (roomIndex >= 0 && roomIndex < ordersFromLocalStorage.length) {
      ordersFromLocalStorage.splice(roomIndex, 1);
    }

    localStorage.setItem(
      "hotel_orders",
      JSON.stringify(ordersFromLocalStorage)
    );
    setOrders(ordersFromLocalStorage);
  };

  return (
    <>
      <div className="w-11/12 sm:w-3/4 mx-auto my-1 p-5 box-border relative flex flex-col sm:flex-row">
        <div className="w-11/12 sm:w-3/5 flex flex-col mt-5">
          <h1 className="text-3xl font-bold flex justify-between items-end">
            <span>Your Reservations</span>
          </h1>
          {!orders || orders.length < 1 ? (
            <div className="my-10">You have not made any reservations yet.</div>
          ) : (
            orders.map((order, i) => (
              <>
                <table key={i} className="w-full my-10">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td className="w-1/3 font-bold">First name:</td>
                      <td>{order.guestFirstName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold">Last name:</td>
                      <td>{order.guestLastName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold">Room name:</td>
                      <td>{order.roomName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold">Move-in date:</td>
                      <td>
                        {format(new Date(order.dateMoveIn), "MMMM d, yyyy")}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold">Move-out date:</td>
                      <td>
                        {format(new Date(order.dateMoveOut), "MMMM d, yyyy")}
                      </td>
                    </tr>

                    <tr>
                      <td className="w-1/3 font-bold">Price (night):</td>
                      <td>${order.roomPrice.toFixed(2)}</td>
                    </tr>

                    <tr>
                      <td className="w-1/3 font-bold">Nights:</td>
                      <td>{nights[i]}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold">Total cost:</td>
                      <td>${order.totalToPay.toFixed(2)}</td>
                    </tr>

                    <tr>
                      <td colSpan="2" className="pt-5 italic">
                        {offerHoursLeft[i] >= 0 ? (
                          `Your offer will expire in ${offerHoursLeft[i]} hour(s).`
                        ) : (
                          <>
                            <div>Your booking has expired.</div>
                            <div>Would you like to make a new reservation?</div>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <button
                    disabled={offerHoursLeft[i] < 0 ? true : false}
                    className={`py-2 w-32 px-3 text-white my-8 text-center rounded me-1 mb-1 ${
                      offerHoursLeft[i] < 0 ? "bg-gray-400" : "bg-red-500"
                    }`}
                    onClick={() => makePayment(i)}
                  >
                    Payment
                  </button>
                  <button
                    className={`py-2 w-32 px-3 text-white ms-8  text-center rounded bg-gray-400   `}
                    onClick={() => handleDeleteRoomReservation(i)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))
          )}
        </div>
        <div className="w-full sm:w-3/5 h-max flex flex-col justify-evenly my-20 sm:my-8 border-4 py-5 px-8">
          <div className="text-2xl my-5">Contact Us</div>
          <p className="flex items-center my-2">
            <img
              className="me-5 my-0.5 w-8"
              src="./icons/phone-icon.png"
              alt="phone"
            />
            +39 (120) 920 3845
          </p>
          <p className="flex items-center my-2">
            <img
              className="me-5 my-0.5 w-8"
              src="./icons/email-icon.png"
              alt="email"
            />
            m.hotel.sanremo@hotels.com
          </p>
          <p className="flex items-center my-2">
            <img
              className="me-5 my-0.5 w-8"
              src="./icons/whatsapp-icon.png"
              alt="whatsapp"
            />
            m-hotel-sanremo
          </p>
          <p className="flex items-center my-2">
            <img
              className="me-5 my-0.5 w-8"
              src="./icons/facebook-icon.png"
              alt="facebook"
            />
            m-hotel-sanremo
          </p>

          <div className="py-2 w-32 px-3 bg-slate-600 text-white my-8 text-center rounded">
            Chat Now
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

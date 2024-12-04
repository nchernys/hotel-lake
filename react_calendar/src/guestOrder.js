import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { calcNumNights } from "./calcNumNights";
import { formatInTimeZone, toDate } from "date-fns-tz";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [offerHoursLeft, setOfferHoursLeft] = useState([]);
  const [nights, setNights] = useState([]);
  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "";

  useEffect(() => {
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
      const nights = calcNumNights(order.dateMoveOut, order.dateMoveIn);
      return nights;
    });

    setNights(updatedNights);
    setOfferHoursLeft(updatedOfferHoursLeft);
  }, []);

  const makePayment = async (index) => {
    const getOrdersToPay = orders[index];

    const stripe = await loadStripe(
      "pk_test_51PCuAZ09yFMm4KWFLPN8qPcbYDQwfYQvUuLZ12qtQStdNMJoLrd4GaIQ6CjW7QnaFIbEDPXUgtsYIeIOYkClLQk500nYejFsni"
    );

    const body = {
      orders: [getOrdersToPay],
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${baseUrl}/api/payment/`, {
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
      <div className="w-full mx-auto gap-5 my-1 px-5 pt-5 pb-[5rem] mt-[5rem] relative flex  items-center flex-col lg:flex-row lg:items-start lg:gap-[8rem] lg:justify-center lg:w-10/12">
        <div className="min-w-[10rem] sm:min-w-[20rem] px-2 pb-[5rem] flex flex-col">
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
                      <td className="w-1/3 font-bold pe-4">First name:</td>
                      <td>{order.guestFirstName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold pe-4">Last name:</td>
                      <td>{order.guestLastName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold pe-4">Room name:</td>
                      <td>{order.roomName}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold pe-4">Move-in date:</td>
                      <td>
                        {formatInTimeZone(
                          order.dateMoveIn,
                          "UTC",
                          "MMMM d, yyyy"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold pe-4">Move-out date:</td>
                      <td>
                        {formatInTimeZone(
                          order.dateMoveOut,
                          "UTC",
                          "MMMM d, yyyy"
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="w-1/3 font-bold pe-4">Price (night):</td>
                      <td>${order.roomPrice.toFixed(2)}</td>
                    </tr>

                    <tr>
                      <td className="w-1/3 font-bold pe-4">Nights:</td>
                      <td>{nights[i]}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-bold pe-4">Total cost:</td>
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
                    className={`py-2 w-32 px-3 text-white my-8 text-center me-8 rounded me-1 mb-1 ${
                      offerHoursLeft[i] < 0 ? "bg-gray-400" : "bg-red-500"
                    }`}
                    onClick={() => makePayment(i)}
                  >
                    Payment
                  </button>
                  <button
                    className={`py-2 w-32 px-3 text-white text-center rounded bg-gray-400   `}
                    onClick={() => handleDeleteRoomReservation(i)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))
          )}
        </div>
        <div className="min-w-[15rem] px-5 box-border h-max flex flex-col justify-evenly border-4">
          <div className="text-2xl my-5">Contact Us</div>
          <p className="flex items-center my-2">
            <img
              className="me-5 my-0.5 w-8"
              src="./icons/phone-icon.png"
              alt="phone"
            />
            +39 (120) 920 3845
          </p>
          <p className="flex items-center my-2 word-break: break-all">
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

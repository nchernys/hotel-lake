import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="w-11/12 sm:w-3/4 mx-auto my-1 p-5 box-border relative flex flex-col sm:flex-row">
        <div className="w-11/12 sm:w-3/5 flex flex-col mt-5">
          <h1 className="text-3xl font-bold flex justify-between items-end">
            <span>Your Reservations</span>
          </h1>
          {!orders ? (
            <div className="my-10">You have not made any reservations yet.</div>
          ) : (
            orders.map((order, index) => (
              <table key={order._id} className="w-full my-10">
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
                    <td className="w-1/3 font-bold">Room category:</td>
                    <td>{order.categoryId.name}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 font-bold">Room name:</td>
                    <td>{order.roomId.name}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 font-bold">Move-in date:</td>
                    <td>{order.dateMoveIn}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 font-bold">Move-out date:</td>
                    <td>{order.dateMoveOut}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 font-bold">Nights:</td>
                    <td>{order.numOfNights}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 font-bold">Total cost:</td>
                    <td>${order.totalToPay.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
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

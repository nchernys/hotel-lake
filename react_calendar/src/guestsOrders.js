import { useState, useEffect } from "react";
import PDFGenerator from "./pdfInvoice";

const GuestsOrders = () => {
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

        setOrders(ordersWithDateObjects);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="w-7/12 mx-auto my-10">
        <div className="text-2xl font-bold">Guest Reservations</div>
        <div>
          {!orders ? (
            <div>No orders yet.</div>
          ) : (
            orders.map((order, index) => (
              <table key={order._id} className="w-full my-10">
                <thead>
                  <tr>
                    <td className="pb-3 text-xl font-bold text-red-600">
                      Order {index + 1}
                    </td>
                    <td className="text-end text-slate-400">
                      <PDFGenerator data={order} />
                    </td>
                  </tr>
                </thead>
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
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default GuestsOrders;

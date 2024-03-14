import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);

  const handleDeleteOrder = (index) => {
    const currentOrders = JSON.parse(localStorage.getItem("orders"));
    if (currentOrders) {
      currentOrders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(currentOrders));
      setOrders(JSON.parse(localStorage.getItem("orders")));
    }
  };

  return (
    <>
      <div className="w-11/12 sm:w-3/4 mx-auto my-1 p-5 box-border relative flex flex-col sm:flex-row">
        <div className="w-11/12 sm:w-3/5 flex flex-col mt-5">
          <h1 className="text-3xl font-bold flex justify-between items-end">
            <span>Orders</span>
          </h1>
          {!orders ? (
            <div className="my-10">You have not made any reservations yet.</div>
          ) : (
            orders.map((order, index) => (
              <div
                key={`order${index}`}
                className="show-date w-80 h-max my-2 text-normal py-5 relative"
              >
                <p className="invoice-cart my-3 text-xs text-slate-300">
                  <strong>Ordered on:</strong> {order.orderedOnSave}
                </p>

                <p className="invoice-cart my-1">
                  <strong>Name:</strong> {order.firstName} {order.lastName}
                </p>
                <p className="invoice-cart my-1">
                  <strong>Move-in date:</strong> {order.selectedMoveinDate}
                </p>
                <p className="invoice-cart my-1">
                  <strong>Move-out date:</strong> {order.selectedMoveoutDate}
                </p>
                <p className="invoice-cart my-1">
                  <strong>Nights:</strong> {order.nightsOfStay} nights
                </p>
                <p className="invoice-cart my-5 text-2xl">
                  <strong>Total ($):</strong> {order.totalToPay.toFixed(2)}
                </p>

                <p className="invoice-cart my-1">
                  <strong>Included:</strong> all-inclusive breakfast, spa salon,
                  fitness center
                </p>

                <div className="absolute -bottom-5 left-0 cursor-pointer">
                  <span className="text-slate-400 me-5">edit</span>

                  <span
                    className="text-red-500"
                    onClick={() => {
                      handleDeleteOrder(`order${index}`);
                    }}
                  >
                    cancel
                  </span>
                </div>
              </div>
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

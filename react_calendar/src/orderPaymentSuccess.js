import { useState, useEffect } from "react";

const PaymentSuccess = () => {
  const [orders, setOrders] = useState([]);
  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "";

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`${baseUrl}/api/admin/orders`);
      if (!response.ok) {
        console.log("Failed to fetch orders.");
      }

      const data = await response.json();
      setOrders(data);
      console.log("SUCCESS", data);

      let localStorageItems =
        JSON.parse(localStorage.getItem("hotel_orders")) || [];
      console.log("localStorageItemsFetched", localStorageItems);

      data.forEach((dbOrder) => {
        const matchingOrder = localStorageItems.find(
          (item) =>
            item.guestFirstName === dbOrder.guestFirstName &&
            item.guestLastName === dbOrder.guestLastName &&
            item.roomId === dbOrder.roomId._id &&
            item.dateMoveIn === dbOrder.dateMoveIn &&
            item.dateMoveOut === dbOrder.dateMoveOut
        );

        if (matchingOrder) {
          console.log("Matching order found in localStorage:", matchingOrder);

          // Filter out the matching order from localStorageItems
          localStorageItems = localStorageItems.filter(
            (item) =>
              !(
                item.guestFirstName === dbOrder.guestFirstName &&
                item.guestLastName === dbOrder.guestLastName &&
                item.roomId === dbOrder.roomId._id &&
                item.dateMoveIn === dbOrder.dateMoveIn &&
                item.dateMoveOut === dbOrder.dateMoveOut
              )
          );
          localStorage.setItem(
            "hotel_orders",
            JSON.stringify(localStorageItems)
          );
        }
      });

      console.log("UPDATED STORAGE", localStorageItems);
    };

    getOrders();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-[10rem]">
      <h2 className="text-5xl">Thank you!</h2>
      <p className="text-2xl my-3 text-center">
        Your order has been submitted successfully!
      </p>
      <p>
        <img
          className="w-12 h-12"
          src="https://img.icons8.com/ios/100/checked--v1.png"
          alt="checked--v1"
        />{" "}
      </p>
    </div>
  );
};

export default PaymentSuccess;

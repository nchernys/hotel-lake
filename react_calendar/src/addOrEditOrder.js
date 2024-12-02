import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { calcNumNights } from "./calcNumNights";
import { formatInTimeZone, toDate } from "date-fns-tz";

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState("");

  const [updatedOrder, setUpdatedOrder] = useState({
    guestFirstName: "",
    guestLastName: "",
    totalToPay: "",
    categoryId: "",
    roomId: null,
    dateMoveIn: new Date(),
    dateMoveOut: new Date(),
  });
  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "";

  useEffect(() => {
    fetchRooms();
    fetchOrder(id);
    console.log("UPDATED ORDER", updatedOrder);
  }, []);

  const fetchRooms = async () => {
    const response = await fetch(`${baseUrl}/api/admin/rooms`);
    if (!response.ok) {
      console.log("Failed to fetch the room.");
    } else {
      const getRooms = await response.json();
      setRooms(getRooms);
    }
  };

  const fetchOrder = async (id) => {
    const response = await fetch(`${baseUrl}/api/admin/orders/${id}`);
    if (!response.ok) {
      console.log("Failed to fetch the order.");
    } else {
      const data = await response.json();
      setUpdatedOrder({
        ...updatedOrder,
        guestFirstName: data.guestFirstName,
        guestLastName: data.guestLastName,
        totalToPay: data.totalToPay,
        categoryId: data.categoryId,
        roomId: data.roomId,
        dateMoveIn: new Date(data.dateMoveIn),
        dateMoveOut: new Date(data.dateMoveOut),
      });
      setRoomSelected(data.roomId);
    }
  };

  useEffect(() => {
    handleTotalPriceUpdateDates();
  }, [updatedOrder.dateMoveIn, updatedOrder.dateMoveOut]);

  const handleTotalPriceUpdateDates = async () => {
    const nights = calcNumNights(
      updatedOrder.dateMoveOut,
      updatedOrder.dateMoveIn
    );
    const calcTotalToPay = Math.round(updatedOrder?.roomId?.price * nights);
    console.log("ROOM - NIGHTS", nights, calcTotalToPay);
    setUpdatedOrder({
      ...updatedOrder,
      totalToPay: calcTotalToPay > 0 ? calcTotalToPay : 0,
    });
  };

  useEffect(() => {
    if (updatedOrder.roomId) {
      handleTotalPriceUpdateRoom();
    }
  }, [updatedOrder.roomId]);

  const handleTotalPriceUpdateRoom = async () => {
    console.log("updatedOrder.roomId", updatedOrder.roomId._id);
    const nights = calcNumNights(
      updatedOrder.dateMoveOut,
      updatedOrder.dateMoveIn
    );
    const calcTotalToPay = Math.round(updatedOrder.roomId.price * nights);
    console.log("ROOM - NIGHTS", nights, calcTotalToPay);
    setUpdatedOrder({
      ...updatedOrder,
      totalToPay: calcTotalToPay > 0 ? calcTotalToPay : 0,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/admin/guests-orders");
  };

  return (
    <div className="w-4/12 mx-auto py-10">
      <div className="text-2xl font-bold">Edit Order</div>
      <form
        className="flex flex-col w-full"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <label className="my-1 py-2">First name</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="text"
          value={updatedOrder.guestFirstName}
          onChange={(event) =>
            setUpdatedOrder({
              ...updatedOrder,
              guestFirstName: event.target.value,
            })
          }
        />
        <label className="my-1 py-2">Last name</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="text"
          value={updatedOrder.guestLastName}
          onChange={(event) =>
            setUpdatedOrder({
              ...updatedOrder,
              guestLastName: event.target.value,
            })
          }
        />
        <label className="my-1 py-2">Move-in date</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="date"
          id="dateMoveIn"
          value={formatInTimeZone(updatedOrder.dateMoveIn, "UTC", "yyyy-MM-dd")}
          onChange={(event) => {
            const selectedDate = event.target.value;
            const utcDate = toDate(`${selectedDate}T00:00:00`, {
              timeZone: "UTC",
            });
            setUpdatedOrder({
              ...updatedOrder,
              dateMoveIn: utcDate.toISOString(),
            });
          }}
        />
        <label className="my-1 py-2">Move-out date</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="date"
          id="dateMoveIn"
          value={formatInTimeZone(
            updatedOrder.dateMoveOut,
            "UTC",
            "yyyy-MM-dd"
          )}
          onChange={(event) => {
            const selectedDate = event.target.value;
            const utcDate = toDate(`${selectedDate}T00:00:00`, {
              timeZone: "UTC",
            });
            setUpdatedOrder({
              ...updatedOrder,
              dateMoveOut: utcDate.toISOString(),
            });
          }}
        />
        <label className="my-1 py-2">Room</label>
        <select
          value={updatedOrder?.roomId?._id}
          className="my-1 p-2 border-dark border-2"
          onChange={(event) => {
            const selectedRoom = rooms.find(
              (room) => room._id === event.target.value
            );
            setUpdatedOrder({
              ...updatedOrder,
              roomId: selectedRoom,
            });
          }}
        >
          <option>Select room</option>
          {rooms &&
            rooms.map((room, i) => (
              <option key={i} value={room._id}>
                {room.name}
              </option>
            ))}
        </select>
        <label className="my-1 py-2">Total to pay ($)</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="number"
          value={updatedOrder.totalToPay}
          readOnly
        />
        <button
          type="submit"
          className="my-10 p-3 bg-slate-600 text-white text-md w-28 text-center transform  active:translate-y-1"
        >
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;

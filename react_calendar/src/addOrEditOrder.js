import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState("");
  const [formattedDateMoveIn, setFormattedDateMoveIn] = useState("");
  const [formattedDateMoveOut, setFormattedDateMoveOut] = useState("");
  const [updatedOrder, setUpdatedOrder] = useState({
    guestFirstName: "",
    guestLastName: "",
    totalToPay: "",
    categoryId: "",
    roomId: "",
    dateMoveIn: new Date(),
    dateMoveOut: new Date(),
  });

  useEffect(() => {
    fetchRooms();
    fetchOrder(id);
  }, []);

  const fetchRooms = async () => {
    const response = await fetch("/api/admin/rooms");
    if (!response.ok) {
      console.log("Failed to fetch the room.");
    } else {
      const getRooms = await response.json();
      setRooms(getRooms);
    }
  };

  const fetchOrder = async (id) => {
    const response = await fetch(`/api/admin/orders/${id}`);
    if (!response.ok) {
      console.log("Failed to fetch the order.");
    } else {
      const data = await response.json();
      setUpdatedOrder(data);
      setRoomSelected(data.roomId);
    }
  };

  const getDates = (translateDate) => {
    const getThisDate = new Date(translateDate);
    const year = getThisDate.getFullYear();
    const month = (getThisDate.getMonth() + 1).toString().padStart(2, "0");
    const day = getThisDate.getDate().toString().padStart(2, "0");
    const getFormattedDate = `${year}-${month}-${day}`;
    return getFormattedDate;
  };

  useEffect(() => {
    handleTotalPriceUpdateDates();
  }, [updatedOrder.dateMoveIn, updatedOrder.dateMoveOut]);

  const handleTotalPriceUpdateDates = async () => {
    const difference =
      new Date(updatedOrder.dateMoveOut).getDate() -
      new Date(updatedOrder.dateMoveIn).getDate();

    const calcTotalToPay = Math.round(updatedOrder.roomId.price * difference);
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
    const response = await fetch(`/api/admin/rooms/${updatedOrder.roomId}`);
    if (response.ok) {
      const data = await response.json();
      const difference =
        new Date(updatedOrder.dateMoveOut) - new Date(updatedOrder.dateMoveIn);
      let calcTotalToPay = 0;
      calcTotalToPay = Math.round(
        data.price * Math.round(difference / (1000 * 60 * 60 * 24))
      );
      setUpdatedOrder({
        ...updatedOrder,
        totalToPay: calcTotalToPay > 0 ? calcTotalToPay : 0,
      });
    }
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
          value={getDates(updatedOrder.dateMoveIn)}
          onChange={(event) => {
            setUpdatedOrder({
              ...updatedOrder,
              dateMoveIn: DateTime.fromISO(event.target.value).toJSDate(),
            });
          }}
        />
        <label className="my-1 py-2">Move-out date</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="date"
          value={getDates(updatedOrder.dateMoveOut)}
          onChange={(event) => {
            setUpdatedOrder({
              ...updatedOrder,
              dateMoveOut: DateTime.fromISO(event.target.value).toJSDate(),
            });
            console.log();
          }}
        />
        <label className="my-1 py-2">Room</label>
        <select
          value={updatedOrder.roomId._id}
          className="my-1 p-2 border-dark border-2"
          onChange={(event) => {
            setUpdatedOrder({
              ...updatedOrder,
              roomId: event.target.value,
            });
          }}
        >
          <option>Select room</option>
          {rooms &&
            rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name}
              </option>
            ))}
        </select>
        <label className="my-1 py-2">Total to pay ($)</label>
        <input
          className="my-1 p-2 border-dark border-2"
          type="number"
          value={updatedOrder.totalToPay}
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

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "./index.css";

function WebCalendar() {
  const [orderedOn, setOrderedOn] = useState(new Date());
  const [moveinDate, setMoveinDate] = useState(new Date());
  const [moveoutDate, setMoveoutDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [outputOrders, setOutputOrders] = useState([]);
  const [isMoveinSubmitted, setIsMoveinSubmitted] = useState(false);
  const [isMoveoutSubmitted, setIsMoveoutSubmitted] = useState(false);
  const [photoView, setPhotoView] = useState(0);
  const [alertMessage, setAlertMessage] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  useEffect(() => {
    setOutputOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const roomPricePerNight = 250;
  const orderedOnSave = orderedOn.toLocaleDateString("en-US", options);
  const selectedMoveinDate = moveinDate.toLocaleDateString("en-US", options);
  const selectedMoveoutDate = moveoutDate.toLocaleDateString("en-US", options);
  const nightsOfStay = Math.ceil(
    (moveoutDate - moveinDate) / (1000 * 60 * 60 * 24)
  );
  const totalToPay = roomPricePerNight * nightsOfStay;

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    if (firstName && lastName && selectedMoveinDate && selectedMoveoutDate) {
      const newOrder = {
        firstName,
        lastName,
        selectedMoveinDate,
        selectedMoveoutDate,
        nightsOfStay,
        totalToPay,
        orderedOnSave,
      };

      const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
      oldOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(oldOrders));
      setIsMoveinSubmitted(false);
      setIsMoveoutSubmitted(false);
      setFirstName("");
      setLastName("");
      setMoveinDate(new Date());
      setMoveoutDate(new Date());
      setReservationSubmitted(true);
    } else {
      setAlertMessage(true);
    }
  };

  const images112 = [
    "./images/room-112/hotel-room-112-1.jpg",
    "./images/room-112/hotel-room-112-2.jpg",
    "./images/room-112/hotel-room-112-3.jpg",
    "./images/room-112/hotel-room-112-4.jpg",
    "./images/room-112/hotel-room-112-5.jpg",
    "./images/room-112/hotel-room-112-6.jpg",
    "./images/room-112/hotel-room-112-7.jpg",
  ];

  const handleZoomRoomImage = (index) => {
    setPhotoView(index);
  };

  return (
    <>
      {reservationSubmitted && (
        <div className="alert z-10 fixed flex items-center justify-center top-40 left-1/2 transform -translate-x-1/2 w-96 h-60 p-5 ms-1/2 bg-slate-800 text-white shadow-3xl rounded-lg">
          <div
            className="close absolute top-5 right-5 cursor-pointer"
            onClick={() => setReservationSubmitted(false)}
          >
            close
          </div>
          <p className="text-center">
            Thank you for submitting your reservation! <br />
            You can change or cancel your order on the{" "}
            <Link to="/orders">Orders</Link> page.
          </p>
        </div>
      )}
      {alertMessage && (
        <div className="alert z-10 fixed top-40 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-96 h-40 ms-1/2 bg-slate-900 text-white shadow-3xl rounded-lg ">
          <div
            className="close absolute top-5 right-5 cursor-pointer"
            onClick={() => setAlertMessage(false)}
          >
            close
          </div>
          <div>
            <p>Please fill out all required fields.</p>
          </div>
        </div>
      )}
      <div className="w-full sm:w-4/5 mx-auto my-1 p-5 box-border relative">
        <h1 className=" text-xl sm:text-3xl mx-3 mb-5 font-bold flex justify-between flex-col sm:flex-row sm:items-end">
          <span>Luxury Room 112 Lake View</span>
          <span className="font-normal text-xl sm:text-2xl">
            Per night: $ {roomPricePerNight.toFixed(2)}
          </span>
        </h1>
        <div className="gallery flex w-full h-full flex-col sm:flex-row">
          <div className="w-full p-b-70% p-3 overflow-hidden relative sm:w-2/3 sm:p-b-20%">
            <img
              className="object-cover absolute"
              src={images112[photoView]}
              alt="room112"
            />
          </div>
          <div className="w-full h-full p-3 flex flex-wrap items-start justify-between sm:w-1/3">
            {images112.map((photo, index) => (
              <div
                key={`photo${index}`}
                className="overflow-hidden m-1 relative w-30% p-b-20% sm:w-46% sm:p-b-30%"
                onClick={() => handleZoomRoomImage(index)}
              >
                <img
                  className="w-full absolute top-0 left-0 "
                  src={photo}
                  alt="room112"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="reservation-form flex flex-col mt-5">
          <form className="flex flex-col p-3 sm:w-full md:w-11/12">
            <h1 className="text-xl font-bold sm:text-3xl m-3">
              Room reservation
            </h1>
            <input
              className="w-full border-2 my-3 p-1 text-lg sm:text-lg sm:w-2/3"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <input
              className="w-full border-2 my-3 p-1 text-lg sm:text-lg sm:w-2/3"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <div className="select-dates flex flex-col sm:flex-row">
              <div className="w-full my-1 sm:w-1/2 md:1/3 sm:me-6 sm:mt-5 h-auto bg-slate-500 text-white text-sm sm:text-base calendar-container">
                <p className="p-3">Move-in</p>
                <Calendar
                  onChange={(newMoveinDate) => {
                    setMoveinDate(newMoveinDate);
                    setIsMoveinSubmitted(true);
                  }}
                  value={moveinDate}
                  tileClassName={({ date }) =>
                    isMoveinSubmitted &&
                    date.toLocaleDateString("en-US", options) ===
                      selectedMoveinDate
                      ? "date-focus"
                      : "date-focus-none"
                  }
                  required
                />
              </div>
              <div className="w-full my-1 sm:w-1/2 md:1/3 sm:me-6 sm:mt-5 h-auto bg-slate-500 text-white text-sm sm:text-base  calendar-container">
                <p className="p-3">Move-out</p>
                <Calendar
                  onChange={(newMoveoutDate) => {
                    setMoveoutDate(newMoveoutDate);
                    setIsMoveoutSubmitted(true);
                  }}
                  value={moveinDate}
                  tileClassName={({ date }) =>
                    isMoveoutSubmitted &&
                    date.toLocaleDateString("en-US", options) ===
                      selectedMoveoutDate
                      ? "date-focus"
                      : "date-focus-none"
                  }
                  required
                />
              </div>
            </div>
          </form>

          <div className="reservation-info w-full flex flex-col my-10 justify-start">
            <h1 className="text-xl font-bold m-3 sm:text-3xl">
              Reservation Details
            </h1>
            <div className="show-date w-96 h-max my-5 m-3 text-xl">
              <p className="invoice-cart my-1">
                <strong>Name:</strong> {firstName} {lastName}
              </p>
              <p className="invoice-cart my-1">
                <strong>Move-in date:</strong>{" "}
                {isMoveinSubmitted && selectedMoveinDate}
              </p>
              <p className="invoice-cart my-1">
                <strong>Move-out date:</strong>{" "}
                {isMoveoutSubmitted && selectedMoveoutDate}
              </p>
              <p className="invoice-cart my-1">
                <strong>Nights:</strong>{" "}
                {isMoveinSubmitted && isMoveoutSubmitted && nightsOfStay > 0
                  ? nightsOfStay + " nights"
                  : ""}
              </p>
              <p className="invoice-cart my-5 text-2xl">
                <strong>Total ($):</strong>
                {isMoveinSubmitted && isMoveoutSubmitted && nightsOfStay > 0
                  ? totalToPay.toFixed(2)
                  : ""}
              </p>
            </div>

            <button
              className="bg-slate-500 w-56 py-3 px-3 h-max text-white text-lg m-3"
              onClick={(e) => handleSubmitReservation(e)}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebCalendar;

//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/

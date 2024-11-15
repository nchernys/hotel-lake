import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "./index.css";
import { DateTime } from "luxon";

const WebCalendar = () => {
  const { roomId, categoryId } = useParams();
  const [showRoomId, setShowRoomId] = useState(roomId);
  const [orderedOn, setOrderedOn] = useState(new Date());
  const [moveinDate, setMoveinDate] = useState(new Date());
  const [moveoutDate, setMoveoutDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isMoveinSubmitted, setIsMoveinSubmitted] = useState(false);
  const [isMoveoutSubmitted, setIsMoveoutSubmitted] = useState(false);
  const [photoView, setPhotoView] = useState(0);
  const [alertMessage, setAlertMessage] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [showRoom, setShowRoom] = useState("");
  const [rangeOfDatesOccupied, setRangeOfDatesOccupied] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [rangeToBook, setRangeToBook] = useState([]);
  const [unavailableDatesRange, setUnavailableDatesRange] = useState([]);
  const [datesUnavailableAlert, setDatesUnavailableAlert] = useState(false);
  const [dateClicked, setDateClicked] = useState("");
  const [isStartOver, setIsStartOver] = useState(false);
  const [newOrderCreated, setNewOrderCreated] = useState("");

  function range(start, stop) {
    const getRangeOfDates = [];
    const startDate = new Date(start);
    const stopDate = new Date(stop);
    while (startDate <= stopDate) {
      const currentDate = new Date(startDate);
      getRangeOfDates.push(currentDate);
      startDate.setDate(startDate.getDate() + 1);
    }
    return getRangeOfDates;
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/admin/rooms/${showRoomId}`);

      if (!response.ok) {
        console.log("Response failed");
      } else {
        const data = await response.json();
        setShowRoom(data);
      }
    };

    fetchRoom();

    const fetchDatesOccupied = async (id) => {
      const response = await fetch("/api/admin/orders/");

      if (!response.ok) {
        console.log("Failed to fetch the order");
      } else {
        const data = await response.json();

        const collectOrderForThisRoom = await data.filter(
          (order) => order.roomId._id === showRoomId
        );

        let datesOccupied = [];
        collectOrderForThisRoom.forEach((order) => {
          const occupied = range(order.dateMoveIn, order.dateMoveOut);
          datesOccupied = datesOccupied.concat(occupied);
        });

        setRangeOfDatesOccupied(datesOccupied);
      }
    };

    fetchDatesOccupied();
  }, [showRoomId]);

  const nightsOfStay = Math.floor(
    (new Date(moveoutDate) - new Date(moveinDate)) / (1000 * 60 * 60 * 24)
  );
  const totalToPay = showRoom.price * nightsOfStay;

  const handleSubmitReservation = async (e) => {
    e.preventDefault();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    if (moveinDate && moveoutDate) {
      const orderedOnSave = orderedOn.toLocaleDateString("en-US", options);
      const selectedMoveinDate = moveinDate.toLocaleDateString(
        "en-US",
        options
      );
      const selectedMoveoutDate = moveoutDate.toLocaleDateString(
        "en-US",
        options
      );
    }

    const saveToDBISOMoveInDate = DateTime.fromJSDate(
      new Date(moveinDate)
    ).toISO();
    const saveToDBISOMoveOutDate = DateTime.fromJSDate(
      new Date(moveoutDate)
    ).toISO();

    if (firstName && lastName && moveinDate && moveoutDate) {
      const newOrder = {
        guestFirstName: firstName,
        guestLastName: lastName,
        totalToPay: totalToPay,
        categoryId: showRoom.category,
        roomId: showRoom._id,
        roomPrice: showRoom.price,
        roomName: showRoom.name,
        dateMoveIn: saveToDBISOMoveInDate,
        dateMoveOut: saveToDBISOMoveOutDate,
        createdAt: new Date(),
      };

      setNewOrderCreated(newOrder);

      let getOrdersfromLocalStorage =
        JSON.parse(localStorage.getItem("hotel_orders")) || [];
      getOrdersfromLocalStorage.push(newOrder);

      localStorage.setItem(
        "hotel_orders",
        JSON.stringify(getOrdersfromLocalStorage)
      );
      {
        /*
      const createOrder = await fetch("/api/admin/orders", {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: { "Content-Type": "application/json" },
      });

      if (!createOrder.ok) {
        console.log("Failed to create an order.");
      } else {
        const data = await createOrder.json();
      }
    */
      }

      setReservationSubmitted(true);

      setFirstName("");
      setLastName("");
      setSelectedRange([]);
      setMoveinDate(null);
      setMoveoutDate(null);
      setIsMoveinSubmitted(false);
      setIsMoveoutSubmitted(false);
    } else {
      setAlertMessage(true);
    }
  };

  const handleZoomRoomImage = (index) => {
    setPhotoView(index);
  };

  const handleSelectRange = (value) => {
    setIsStartOver(false);
    setSelectedRange(value);
    setMoveinDate(value[0]);
    setMoveoutDate(value[1]);
    setIsMoveinSubmitted(true);
    setIsMoveoutSubmitted(true);

    const rangeToBookArr = range(value[0], value[1]);
    setRangeToBook(rangeToBookArr);

    const unavailableDates = rangeToBookArr.filter((date) =>
      rangeOfDatesOccupied.some((d) => d.getTime() === date.getTime())
    );

    setUnavailableDatesRange(unavailableDates);

    if (unavailableDates.length > 0) {
      setDatesUnavailableAlert(true);
    }
  };

  const handleStartOverCalendar = () => {
    setDateClicked("");
    setRangeToBook([]);
    setSelectedRange([]);
    setMoveinDate(null);
    setMoveoutDate(null);
    setIsMoveinSubmitted(false);
    setIsMoveoutSubmitted(false);
  };

  const handlePrevious = async () => {
    const roomsByCategory = await fetch(
      `/api/admin/rooms/category/${showRoom.category}`
    );
    if (!roomsByCategory.ok) {
      console.log("Failed to fetch rooms.");
    } else {
      const rooms = await roomsByCategory.json();
      const currentIndex = rooms.findIndex((room) => room._id === showRoomId);
      let getIndex = 0;
      if (currentIndex > 0) {
        getIndex = currentIndex - 1;
      } else if (currentIndex === 0) {
        getIndex = rooms.length - 1;
      }
      const prevRoomId = rooms[getIndex]._id;
      setShowRoomId(prevRoomId);
    }
  };

  const handleNext = async () => {
    const roomsByCategory = await fetch(
      `/api/admin/rooms/category/${showRoom.category}`
    );
    if (!roomsByCategory.ok) {
      console.log("Failed to fetch rooms.");
    } else {
      const rooms = await roomsByCategory.json();
      const currentIndex = rooms.findIndex((room) => room._id === showRoomId);
      let getIndex = 0;
      if (currentIndex === rooms.length - 1) {
        getIndex = 0;
      } else {
        getIndex = currentIndex + 1;
      }
      const prevRoomId = rooms[getIndex]._id;
      setShowRoomId(prevRoomId);
    }
  };

  return (
    <>
      {datesUnavailableAlert && (
        <div className="alert z-10 fixed top-40 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-96 h-auto p-10 ms-1/2 bg-slate-900 text-white shadow-3xl rounded-lg">
          <div
            className="close absolute top-5 right-5 cursor-pointer"
            onClick={() => setDatesUnavailableAlert(false)}
          >
            close
          </div>
          <div className="flex flex-col justify-center">
            Unfortunately, the following dates are unavailable for the
            reservation:
            <div className="p-5">
              {unavailableDatesRange.map((date) => (
                <div>{date.toLocaleDateString()}</div>
              ))}
            </div>
            Please select other dates.
          </div>
        </div>
      )}
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
            You can make a payment on the{" "}
            <Link to="/orders">
              <u>Orders</u>
            </Link>{" "}
            page.
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

      <div className="w-full  mx-auto mt-1 px-3 pb-20 mb-14 box-border sm:w-4/5">
        <div className="flex w-full text-xl justify-between pt-5 pb-7 sm:text-lg">
          <span
            className="w-auto flex items-center opacity-25 cursor-pointer"
            onClick={handlePrevious}
          >
            <img
              className="w-4 h-4 me-3"
              src="https://img.icons8.com/ios-filled/50/323b46e2/back.png"
              alt="back"
            />
            Previous
          </span>
          <span
            className="w-auto  flex items-center opacity-25 cursor-pointer"
            onClick={handleNext}
          >
            Next{" "}
            <img
              className="w-4 h-4 ms-3"
              src="https://img.icons8.com/ios-filled/50/323b46e2/forward--v1.png"
              alt="forward"
            />
          </span>
        </div>
        {showRoom && (
          <>
            <h1 className=" text-xl sm:text-3xl mx-3 mb-5 font-bold flex justify-between flex-col sm:flex-row sm:items-end">
              <span>{showRoom.name} </span>
              <span className="font-normal text-xl sm:text-2xl">
                Per night ($): {showRoom.price.toFixed(2)}
              </span>
            </h1>
            <div className="gallery flex w-full h-full flex-col sm:flex-row">
              <div className="w-full p-3 overflow-hidden sm:w-2/3 ">
                <img
                  className="object-cover "
                  src={`/${showRoom.pictures[photoView]}`}
                  alt={`${showRoom.pictures[photoView]}`}
                />
              </div>
              <div className="w-full h-full p-3 flex flex-wrap items-start justify-between sm:w-1/3">
                {showRoom.pictures.map((photo, index) => (
                  <div
                    key={`photo${index}`}
                    className="overflow-hidden m-1 relative w-30% p-b-20% sm:w-46% sm:p-b-30%"
                    onClick={() => handleZoomRoomImage(index)}
                  >
                    <img
                      className="w-full absolute top-0 left-0 "
                      src={`/${photo}`}
                      alt="room112"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
              <div className="calendar-container w-full my-5 p-5 sm:me-6 sm:mt-5 h-auto bg-slate-500 text-white text-sm sm:text-base sm:w-9/12 md:w-8/12 lg:w-1/2">
                <Calendar
                  selectRange={true}
                  value={selectedRange}
                  onClickDay={(date) => {
                    setDateClicked(date);
                  }}
                  onChange={handleSelectRange}
                  tileDisabled={({ date }) =>
                    date < new Date() ||
                    rangeOfDatesOccupied.some(
                      (rangeDate) =>
                        rangeDate.getFullYear() === date.getFullYear() &&
                        rangeDate.getMonth() === date.getMonth() &&
                        rangeDate.getDate() === date.getDate()
                    )
                  }
                  tileClassName={({ date }) => {
                    const isOccupied =
                      date < new Date() ||
                      rangeOfDatesOccupied.some(
                        (rangeDate) =>
                          rangeDate.getFullYear() === date.getFullYear() &&
                          rangeDate.getMonth() === date.getMonth() &&
                          rangeDate.getDate() === date.getDate()
                      );
                    if (isOccupied) {
                      return "date-unavailable";
                    }

                    const isClicked =
                      dateClicked && date.getTime() === dateClicked.getTime();
                    if (isClicked) {
                      return "date-focus";
                    }

                    const isInRange = rangeToBook.some(
                      (rangeDate) =>
                        rangeDate.getFullYear() === date.getFullYear() &&
                        rangeDate.getMonth() === date.getMonth() &&
                        rangeDate.getDate() === date.getDate()
                    );
                    if (isInRange && unavailableDatesRange.length === 0) {
                      return "date-focus";
                    } else {
                      return "date-focus-none";
                    }
                  }}
                />
                <div className="px-5" onClick={handleStartOverCalendar}>
                  Start over
                </div>
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
                {isMoveinSubmitted &&
                  unavailableDatesRange.length === 0 &&
                  moveinDate &&
                  moveinDate.toDateString()}
              </p>
              <p className="invoice-cart my-1">
                <strong>Move-out date:</strong>{" "}
                {isMoveoutSubmitted &&
                  unavailableDatesRange.length === 0 &&
                  moveoutDate &&
                  moveoutDate.toDateString()}
              </p>
              <p className="invoice-cart my-1">
                <strong>Nights:</strong>{" "}
                {isMoveinSubmitted &&
                isMoveoutSubmitted &&
                unavailableDatesRange.length === 0 &&
                nightsOfStay > 0
                  ? nightsOfStay + " nights"
                  : ""}
              </p>
              <p className="invoice-cart my-5 text-2xl">
                <strong>Total ($):</strong>
                {isMoveinSubmitted &&
                isMoveoutSubmitted &&
                nightsOfStay > 0 &&
                unavailableDatesRange.length === 0
                  ? totalToPay.toFixed(2)
                  : ""}
              </p>
            </div>
          </div>
          <button
            className="bg-slate-500 w-56 py-3 px-3 h-max text-white text-lg m-3"
            onClick={(e) => handleSubmitReservation(e)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default WebCalendar;

//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/

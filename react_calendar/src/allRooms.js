import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "";

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`${baseUrl}/api/admin/rooms`);

      if (!response.ok) {
        console.log("Failed to fetch rooms.");
      } else {
        const data = await response.json();

        setRooms(data);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="w-7/12 mx-auto">
      <div className="my-10">
        {" "}
        <Link to="/admin"> &larr; Return to the dashboard </Link>
      </div>
      <div className="text-3xl font-bold mt-5">All Hotel Rooms</div>
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <div key={room._id} className="py-10 border-b-2">
            <div>
              <strong>Room name:</strong> {room.name}{" "}
            </div>
            <div>
              <strong>Room category: </strong> {room.category.name}{" "}
            </div>
            <div>
              <strong>Room description</strong> {room.description}{" "}
            </div>
            <div>
              <strong>Room price (night):</strong> ${room.price.toFixed(2)}{" "}
            </div>
            <div>
              <strong>Room photos:</strong>
            </div>
            <div className="w-full flex flex-wrap my-3">
              {room.pictures &&
                room.pictures.map((picture) => (
                  <div className="w-1/6 h-24 m-1 ms-0 overflow-hidden relative">
                    <img
                      src={`../${picture}`}
                      className="absolute w-full h-full"
                    />{" "}
                  </div>
                ))}
            </div>
            <div className="flex mt-10">
              <button className="me-3 bg-slate-200 px-3 py-2">
                <Link to={`/admin/update-room/${room._id}`}>Update</Link>
              </button>{" "}
              <button className="me-10 bg-slate-200  px-3 py-2">Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllRooms;

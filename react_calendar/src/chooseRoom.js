import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ChooseRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const categoryBoxRefs = useRef({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "..";

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
    };
  };

  useEffect(() => {
    preloadImage("/images/lobby/hotel-lobby-6.webp");
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${baseUrl}/api/admin/categories`);

      if (!response.ok) {
        console.log("Failed to fetch categories.");
      } else {
        const getCategories = await response.json();
        setCategories(getCategories);
      }
    };

    fetchCategories();

    const fetchRooms = async () => {
      const response = await fetch(`${baseUrl}/api/admin/rooms`);
      if (!response.ok) {
        console.log("Failed to fetch the room.");
      } else {
        const getRooms = await response.json();
        setRooms(getRooms);
      }
    };
    fetchRooms();

    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-box")) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log(baseUrl);

  const handleVisible = (id) => {
    setSelectedCatId(id);
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="w-auto h-[63%] overflow-hidden">
        <img
          src="/images/lobby/hotel-lobby-6.webp"
          alt="Loading..."
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
          style={{
            objectPosition: "50% 23%",
          }}
        />
      </div>

      <div className="w-full px-[3rem] mt-1 mb-5 py-3 box-border relative scrolling">
        <div className="flex flex-col w-full h-full mx-auto flex-wrap justify-between my-0 lg:w-11/12 sm:flex-row my-5">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col w-full md:w-1/4 py-1 mx-3 category-box"
            >
              <div
                className="text-xl me-5 font-bold w-auto flex flex-row justify-between items-center py-5 border-b-2 cursor-pointer"
                onClick={() => handleVisible(category._id)}
              >
                <span className="pe-5">{category.name} Rooms</span>
                <span className="hidden">
                  <img
                    className={`w-8 h-4 ${
                      isVisible && category._id === selectedCatId
                        ? "transform rotate-180"
                        : "transform rotate-0"
                    }`}
                    src="https://img.icons8.com/windows/323b46e2/96/expand-arrow--v1.png"
                    alt="expand-category"
                  />
                </span>
              </div>

              <div
                className={`w-auto h-auto flex flex-col py-5 bg-white   ${
                  isVisible && category._id === selectedCatId ? "visible" : ""
                }`}
              >
                {rooms
                  .filter((room) => room.category._id === category._id)
                  .map((room) => (
                    <div key={room._id} className="my-5">
                      <Link to={`/reserve/${room._id}`}>{room.name}</Link>
                    </div>
                  ))}
                {rooms.filter((room) => room.category._id === category._id)
                  .length === 0 && (
                  <div className="my-5">No rooms found in this category.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChooseRoom;

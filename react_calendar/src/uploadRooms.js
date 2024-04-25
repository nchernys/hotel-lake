import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadRooms = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [pictures, setPictures] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) {
        console.log("Failed to fetch categories.");
      } else {
        const data = await response.json();
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const newRoom = new FormData();
    newRoom.append("name", name);
    newRoom.append("description", description);
    newRoom.append("category", category);
    newRoom.append("price", price);

    for (let i = 0; i < pictures.length; i++) {
      newRoom.append("pictures", pictures[i]);
    }

    const response = await fetch("/api/admin/rooms", {
      method: "POST",
      body: newRoom,
    });

    if (!response.ok) {
      console.log("Failed to upload a new room.", response.statusText);
    } else {
      const data = await response.json();
    }

    navigate("/admin/all-rooms");
  };

  return (
    <div className="w-7/12 mx-auto">
      <div className="my-10">
        {" "}
        <Link to="/admin"> &larr; Return to the dashboard </Link>
      </div>
      <div className="text-2xl my-5 font-bold">Add New Rooms</div>
      <form
        className="flex flex-col w-full"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <label className="my-2 font-bold">Room Name:</label>
        <input
          className="my-1 w-full p-2 border-2"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="my-2 font-bold">Room Description:</label>
        <textarea
          className="my-1 w-full p-2 border-2"
          cols="30"
          rows="4"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        ></textarea>
        <label className="my-2 font-bold">Price:</label>
        <input
          className="my-1 w-full p-2 border-2"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label className="my-2 font-bold"> Category:</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="my-1 w-full p-2 border-2"
        >
          <option value="">Choose category </option>
          {categories &&
            categories.length > 0 &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id} className="text-xl">
                {" "}
                {cat.name}
              </option>
            ))}
        </select>
        <label className="my-2 font-bold">Photos:</label>
        <input
          className="border-2"
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            setPictures(files);
          }}
        />

        <button
          type="submit"
          className="py-2 my-14 w-60 font-bold bg-slate-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadRooms;

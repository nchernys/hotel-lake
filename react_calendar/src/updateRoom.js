import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateRoom = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [pictures, setPictures] = useState([]);
  const [existingPictures, setExistingPictures] = useState([]);
  const [newPictures, setNewPictures] = useState([]);
  const [roomToUpdate, setRoomToUpdate] = useState("");

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

    const fetchRoom = async () => {
      const response = await fetch(`/api/admin/rooms/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch the room.", response.statusText);
      } else {
        const data = await response.json();
        setRoomToUpdate(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category);
        setExistingPictures(data.pictures);
        console.log(data.pictures);
      }
    };

    fetchRoom(id);
  }, [id, setExistingPictures]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("SAVED PICS", existingPictures, newPictures);
    const updateRoom = new FormData();
    updateRoom.append("name", name);
    updateRoom.append("description", description);
    updateRoom.append("category", category);
    updateRoom.append("price", price);

    for (let i = 0; i < existingPictures.length; i++) {
      updateRoom.append("oldPictures", existingPictures[i]);
    }

    for (let i = 0; i < newPictures.length; i++) {
      updateRoom.append("newPictures", newPictures[i]);
    }

    const response = await fetch(`/api/admin/rooms/${id}`, {
      method: "PATCH",
      body: updateRoom,
    });

    if (!response.ok) {
      console.log("Failed to update the room details.", response.statusText);
    } else {
      const data = await response.json();
      console.log(data);
      navigate("/admin/all-rooms");
    }
  };

  const handleDeletePicture = async (index) => {
    const newPicArray = existingPictures.filter((pic, ind) => ind !== index);
    setExistingPictures(newPicArray);
    console.log("NEW ARRAY DELETE", newPicArray);
  };

  return (
    <div className="w-7/12 mx-auto mb-10">
      <div className="my-10">
        {" "}
        <Link to="/admin"> &larr; Return to the dashboard </Link>
      </div>
      <div className="text-2xl my-5 font-bold">Update the Room</div>
      <form
        className="flex flex-col w-full"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <label className="my-3 font-bold">Room Name:</label>
        <input
          className="my-1 w-full p-2 border-2"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="my-3 font-bold">Room Description:</label>
        <textarea
          className="my-1 w-full p-2 border-2"
          cols="30"
          rows="4"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        ></textarea>
        <label className="my-3 font-bold">Price:</label>
        <input
          className="my-1 w-full p-2 border-2"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label className="my-3 font-bold">Category:</label>
        <select
          value={category}
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
        <label className="my-3 mb-8 font-bold">Photos:</label>
        {existingPictures &&
          existingPictures.map((picture, index) => (
            <div key={index} className="flex items-center mt-1 mb-5 ">
              <img
                className="w-6  mx-5 cursor-pointer"
                src="/icons/trash-icon.png"
                onClick={() => handleDeletePicture(index)}
              />{" "}
              {picture}
            </div>
          ))}
        <input
          className="border-2 my-5"
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            setNewPictures(files);
          }}
        />
        <button
          type="submit"
          className="py-3 w-60 my-16 bg-slate-300 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;

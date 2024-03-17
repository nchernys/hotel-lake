import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UploadCategory = () => {
  const [name, setName] = useState("");
  const [cats, setCats] = useState("");

  useEffect(() => {
    const allCats = async () => {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) {
        console.log("Failed to fetch categories.");
      } else {
        const data = await response.json();
        setCats(data);
      }
    };
    allCats();
  }, [setCats]);

  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      console.log("Category upload failed.");
    } else {
      const data = await response.json();
      console.log("Category added", data);
    }
  };

  const handleDeleteCategory = async (id) => {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed to delete the category.");
    } else {
      const data = await response.json();
      const updateCats = cats.filter((cat) => cat._id !== id);
      setCats(updateCats);
    }
  };

  return (
    <div className="w-4/12 mx-auto my-10">
      <div className="my-10">
        {" "}
        <Link to="/admin"> &larr; Return to the dashboard </Link>
      </div>
      <div className="text-2xl font-bold my-5">Add a room category</div>
      <form
        className="flex flex-col items-start w-full my-5 py-5 box-border"
        onSubmit={(event) => handleSubmitCategory(event)}
      >
        <input
          className="mb-10 border-2 p-3 w-full"
          type="text"
          placeholder="Cagetory name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button className="bg-slate-300 font-bold py-2 w-60" type="submit">
          Submit
        </button>
      </form>

      <div className="my-16 w-full">
        <div className="text-2xl font-bold my-5">All Categories</div>
        <ol>
          {cats && cats.length > 0 ? (
            cats.map((cat) => (
              <li key={cat._id} className="text-lg my-2 flex justify-between">
                <span>{cat.name}</span>
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={() => {
                    handleDeleteCategory(cat._id);
                  }}
                >
                  del
                </span>
              </li>
            ))
          ) : (
            <div className="my-5"> No category was found. </div>
          )}
        </ol>
      </div>
    </div>
  );
};

export default UploadCategory;

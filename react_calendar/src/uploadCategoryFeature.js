import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UploadCategory = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [cats, setCats] = useState("");
  const [nameFeature, setNameFeature] = useState("");
  const [features, setFeatures] = useState("");
  const [noDelete, setNoDelete] = useState(false);
  const baseUrl =
    process.env.REACT_APP_STATUS === "development"
      ? "http://localhost:4002"
      : "";

  const allCats = async () => {
    const response = await fetch(`${baseUrl}/api/admin/categories`);
    if (!response.ok) {
      console.log("Failed to fetch categories.");
    } else {
      const data = await response.json();
      setCats(data);
    }
  };

  const allFeatures = async () => {
    const response = await fetch(`${baseUrl}/api/admin/features`);
    if (!response.ok) {
      console.log("Failed to fetch features.");
    } else {
      const data = await response.json();
      setFeatures(data);
    }
  };

  useEffect(() => {
    allCats();
    allFeatures();
  }, []);

  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    const response = await fetch(`${baseUrl}/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameCategory }),
    });

    if (!response.ok) {
      console.log("Category upload failed.");
    } else {
      const data = await response.json();
      setNameCategory("");
      allCats();
    }
  };

  const handleDeleteCategory = async (id) => {
    const response = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed to delete the category.");
    } else {
      const data = await response.json();
      if (data.message === "no-delete") {
        setNoDelete(true);
        setTimeout(() => {
          setNoDelete(false);
        }, 5000);
      }
      const updateCats = cats.filter((cat) => cat._id !== id);
      setCats(updateCats);
      allCats();
    }
  };

  const handleSubmitFeature = async (event) => {
    event.preventDefault();
    const response = await fetch(`${baseUrl}/api/admin/features`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameFeature }),
    });

    if (!response.ok) {
      console.log("Feature upload failed.");
    } else {
      const data = await response.json();
      setNameFeature("");
      allFeatures();
    }
  };

  const handleDeleteFeature = async (id) => {
    const response = await fetch(`${baseUrl}/api/admin/features/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed to delete the feature.");
    } else {
      const data = await response.json();
      const updateFeatures = features.filter((feature) => feature._id !== id);
      setFeatures(updateFeatures);
      allFeatures();
    }
  };

  return (
    <div className="w-8/12 mx-auto my-10">
      <div className="my-10">
        {" "}
        <Link to="/admin"> &larr; Return to the dashboard </Link>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-1/2 pe-20">
          <div className="text-2xl font-bold my-5">Add a room category</div>
          <form
            className="flex flex-col items-start w-full my-5 py-5 box-border"
            onSubmit={(event) => handleSubmitCategory(event)}
          >
            <input
              className="mb-10 border-2 p-3 w-full"
              type="text"
              placeholder="Cagetory name"
              onChange={(e) => setNameCategory(e.target.value)}
              value={nameCategory}
            />
            <button className="bg-slate-300 font-bold py-2 w-60" type="submit">
              Submit
            </button>
          </form>

          <div className="my-16 w-full">
            <div className="text-2xl font-bold my-5">All Categories</div>
            <div
              className={`transition-opacity duration-500 ${
                noDelete ? "opacity-100" : "opacity-0"
              }`}
            >
              {noDelete && (
                <div className="text-red-500">
                  Category contains associated rooms.
                </div>
              )}
            </div>
            <ol>
              {cats && cats.length > 0 ? (
                cats.map((cat) => (
                  <li
                    key={cat._id}
                    className="text-lg my-2 flex justify-between"
                  >
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
      </div>
    </div>
  );
};

export default UploadCategory;

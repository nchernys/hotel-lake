import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="w-7/12 mt-16 mx-auto">
      <div className="text-4xl font-bold  my-5"> Admin Dashboard </div>
      <div className="flex">
        <div className="w-1/2">
          <div className="text-2xl font-bold mt-10 mb-5">
            Room Categories and Features
          </div>
          <div className="my-3 text-xl">
            <Link to="/admin/categories-features">
              Manage categories and features
            </Link>{" "}
          </div>
          <div className="text-2xl font-bold mt-10 mb-5">Rooms</div>
          <div className="my-3 text-xl">
            <Link to="/admin/all-rooms">Manage rooms </Link>{" "}
          </div>
          <div className="my-3 text-xl">
            <Link to="/admin/upload-room">Add a new room </Link>{" "}
          </div>
        </div>
        <div className="w-2/12"></div>
        <div className="w-1/2">
          <div className="text-2xl font-bold mt-10 mb-5">Guest Orders</div>
          <div className="my-3 text-xl">
            <Link to="/admin/guests-orders">Manage orders </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

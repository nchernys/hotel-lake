import { useState } from "react";
import { Link } from "react-router-dom";
function Navigation() {
  const [menuShow, setMenuShow] = useState(false);

  const handleMenu = () => {
    if (menuShow === false) {
      setMenuShow(true);
    } else {
      setMenuShow(false);
    }
  };

  const handleLinkClick = () => {
    setMenuShow(false);
  };

  return (
    <>
      <header className="py-2 px-8 text-lg hidden justify-between  sm:flex">
        <div className="flex items-center">
          <div className="me-10">
            <img width="50" height="50" src="./icons/hotel-logo.png" />
          </div>
          <div className="me-10">
            <Link to="/">Home</Link>
          </div>
          <div className="me-10">
            <Link to="/about">Our Hotel</Link>
          </div>
          <div className="me-10">
            <Link to="/reserve">Room Reservation</Link>
          </div>
          <div className="me-10">
            <Link to="/orders">Orders</Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="me-10">
            <Link to="/admin">Admin Dashboard</Link>
          </div>
        </div>
      </header>
      <header className="py-2 px-4 text-lg flex justify-between items-center sm:hidden">
        <p className="">
          <img width="50" height="50" src="./icons/hotel-logo.png" />
        </p>
        <div className="relative text-2xl">
          <div onClick={handleMenu}> {menuShow ? "Close" : "Menu"}</div>
          <div
            className={`menu-dropdown absolute w-80 top-10 right-0 z-10 bg-white shadow-xl ${
              menuShow ? "block" : "hidden"
            }`}
          >
            <div className="p-10 border-b-2 text-center">
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </div>
            <div className="p-10 border-b-2 text-center">
              <Link to="/about" onClick={handleLinkClick}>
                Our Hotel
              </Link>
            </div>
            <div className="p-10 border-b-2 text-center">
              <Link to="/reserve" onClick={handleLinkClick}>
                Reservation
              </Link>
            </div>
            <div className="p-10 border-b-2 text-center">
              <Link to="/orders" onClick={handleLinkClick}>
                Orders
              </Link>
            </div>
            <div className="p-10 border-b-2 text-center">
              <Link to="/admin" onClick={handleLinkClick}>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;

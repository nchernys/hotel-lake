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
      <header className="py-2 px-8 text-lg hidden items-center sm:flex">
        <p className="me-10">
          <img width="50" height="50" src="./icons/hotel-logo.png" />
        </p>
        <p className="me-10">
          <Link to="/">Home</Link>
        </p>
        <p className="me-10">
          <Link to="/about">Our Hotel</Link>
        </p>
        <p className="me-10">
          <Link to="/reserve">Room Reservation</Link>
        </p>
        <p className="me-10">
          <Link to="/orders">Orders</Link>
        </p>
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
            <p className="p-10 border-b-2 text-center">
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </p>
            <p className="p-10 border-b-2 text-center">
              <Link to="/about" onClick={handleLinkClick}>
                Our Hotel
              </Link>
            </p>
            <p className="p-10 border-b-2 text-center">
              <Link to="/reserve" onClick={handleLinkClick}>
                Reservation
              </Link>
            </p>
            <p className="p-10 border-b-2 text-center">
              <Link to="/orders" onClick={handleLinkClick}>
                Orders
              </Link>
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;

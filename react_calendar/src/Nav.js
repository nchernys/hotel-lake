import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faSpa,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  {
    label: "HOME",
    link: "/",
  },
  {
    label: "OUR HOTEL",
    link: "/about",
  },
  {
    label: "ROOM RESERVATION",
    link: "/choose-room",
  },
  {
    label: "ORDERS",
    link: "/orders",
  },
];
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
      <header className="py-3 px-8 text-lg hidden justify-between md:flex">
        <div className="flex items-center">
          <div className="me-12">
            <FontAwesomeIcon className="text-2xl opacity-80" icon={faSpa} />
          </div>
          {navLinks.map((item) => (
            <div className="me-12 opacity-80 hover:opacity-80 transition duration-300 ease-in-out group flex items-center relative">
              <Link
                className="text-lg transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                to={`${item.link}`}
              >
                {item.label}
              </Link>
              <FontAwesomeIcon
                className="w-6 h-6 top-1/2 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                icon={faCaretRight}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <div>
            <Link className="font-light opacity-80 animate-spin" to="/admin">
              ADMIN
            </Link>
          </div>
        </div>
      </header>
      <header className="py-2 px-4 text-lg flex justify-between items-center md:hidden">
        <div className="me-12">
          <FontAwesomeIcon className="text-2xl opacity-80" icon={faSpa} />
        </div>
        <div className="relative text-2xl">
          <div onClick={handleMenu}>
            {" "}
            {menuShow ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="text-4xl cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="text-4xl cursor-pointer"
              />
            )}
          </div>
          <div
            className={`menu-dropdown absolute w-80 h-auto top-10 right-0 z-10 bg-slate-500 text-white rounded-2xl overflow-hidden shadow-2xl box-border ${
              menuShow ? "block" : "hidden"
            }`}
          >
            {navLinks.map((item, i) => (
              <div
                key={i}
                className="relative p-10 border-b-1 border-gray-400 text-center overflow-hidden box-border group last:border-b-0"
              >
                <div className="absolute w-20 h-20 bg-white rounded-full opacity-0 border border-white scale-1 animate-none transform group-hover:animate-expandBtn"></div>
                <Link
                  className="relative z-10"
                  to={`${item.link}`}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;

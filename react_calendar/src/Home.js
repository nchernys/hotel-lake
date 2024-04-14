import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-image flex items-center">
        <div className="home-title flex flex-col px-5 text-6xl font-bold text-white sm:text-7xl sm:-translate-y-0 md:hidden">
          <div className="overflow-hidden">
            <div className="title-word-1 pb-2">Mountain</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-2 py-2">Lake</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-3 py-2">Resort</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-4 mt-20 w-60 py-4 text-3xl flex justify-center bg-blue-400 sm:text-3xl sm:font-normal sm:w-72 sm:py-5">
              <Link to="/choose-room">Book a room</Link>
            </div>
          </div>
        </div>
        <div className="home-overlay hidden md:flex">
          <div className="home-overlay-inner ">
            <div className="home-text">
              <div className="home-text-subheading">
                <div>
                  <Link to="/choose-room">Book today!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-image">
        <div className="home-title flex flex-col pt-28 px-5 text-6xl font-bold text-white sm:hidden">
          <div className="overflow-hidden">
            <div className="title-word-1 py-2">Mountain</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-2 py-2">Lake</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-3 py-2">Resort</div>
          </div>
          <div className="overflow-hidden">
            <div className="title-word-4 my-20 w-60 py-4 text-3xl flex justify-center bg-blue-400">
              <Link to="/reserve">Book a room</Link>
            </div>
          </div>
        </div>
        <div className="home-overlay hidden sm:flex">
          <div className="home-overlay-inner ">
            <div className="home-text">
              <div className="home-text-subheading">
                <div>
                  <Link to="/reserve">Book today!</Link>
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

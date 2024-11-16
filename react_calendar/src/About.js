import { useEffect } from "react";

const About = () => {
  const hotelImages = [
    "./images/hotel/hotel-0.webp",
    "./images/hotel/hotel-1.webp",
    "./images/hotel/hotel-5.webp",
    "./images/hotel/hotel-6.webp",
    "./images/hotel/hotel-3.webp",
    "./images/hotel/hotel-4.webp",
  ];

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    preloadImages(hotelImages);
  }, []);

  return (
    <div className="w-full mx-auto flex flex-col justify-center p-5">
      <div className="w-full text-center text-3xl font-bold my-4 lg:mb-8 xl:text-5xl 2xl:text-6xl">
        Mountain Lake Resort
      </div>
      <div className="w-full mx-auto flex flex-col justify-center py-5 lg:flex-row lg:w-7/12 xl:w-11/12 xl:items-start ">
        <div className="w-full h-full justify-evenly my-1  mb-10 box-border flex flex-wrap lg:w-2/6 xl:w-9/12 xl:justify-center xl:items-center">
          {hotelImages.map((img) => (
            <div className="m-1 w-30% lg:w-full lg:my-1 xl:w-46%">
              <img src={img} alt="hotel-img" />
            </div>
          ))}
        </div>
        <div className="w-full lg:w-4/6 lg:ps-5 mb-10 px-4 box-border">
          <div className="2xl:text-2xl">
            <p className="mb-5">
              Escape to the serene beauty of our mountain retreat nestled by the
              glistening lake, where tranquility meets luxury at Mountain Lake
              Resort. Embrace the enchanting ambiance as you wake up to
              breathtaking views of towering peaks and crystal-clear waters from
              the comfort of your elegantly appointed room. Discover a haven of
              relaxation and adventure, where our resort seamlessly integrates
              nature's beauty with top-notch amenities to create an
              unforgettable experience.
            </p>
            <p className="my-5">
              Indulge your senses at our world-class spa, where seasoned
              therapists guide you on a journey of rejuvenation. Immerse
              yourself in a range of revitalizing treatments designed to melt
              away stress and leave you feeling utterly pampered. Our spa
              facilities boast panoramic views of the surrounding mountains,
              providing a calming backdrop for your wellness journey.
            </p>
            <p className="my-5">
              Maintain your active lifestyle at our state-of-the-art fitness
              center, equipped with the latest equipment and overseen by
              experienced trainers. Whether you prefer a vigorous workout or a
              gentle yoga session, our fitness facilities cater to all levels,
              ensuring you stay energized during your stay. At Mountain Lake
              Resort, we pride ourselves on offering a comprehensive array of
              amenities. Savor delectable cuisines at our signature restaurants,
              featuring a blend of local flavors and international delicacies.{" "}
            </p>
            <p className="my-5">
              Unwind by the poolside with a refreshing cocktail in hand, or
              embark on outdoor adventures guided by our experienced staff. Your
              mountain escape awaits at Mountain Lake Resort – a sanctuary where
              nature's beauty meets unparalleled hospitality. Book your stay now
              and immerse yourself in a world of luxury, relaxation, and
              adventure. Experience the pinnacle of mountain resort living with
              us!
            </p>
            <p>Cordiali saluti,</p>
            <p className="my-5">
              <img src="./icons/signature-icon.png" alt="signature" />
            </p>
            <p>
              Luca Bellini <br />
              CEO, Head Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

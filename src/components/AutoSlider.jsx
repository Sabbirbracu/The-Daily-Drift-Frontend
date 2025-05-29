// components/AutoSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const AutoSlider = ({ children, slidesToShow = 1, speed = 500, autoplaySpeed = 3000 }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed,
    pauseOnHover: true,
    arrows: false,
    fade: slidesToShow === 1, // fade only if 1 slide showing
  };

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default AutoSlider;

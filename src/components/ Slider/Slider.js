import "./Slider.css";
import { useState } from "react";
import Slider from "react-slick";
import image1 from '../../images/Slider1.png'
import image2 from '../../images/Slider2.png'
import image3 from '../../images/Slider3.png'
import image4 from '../../images/Slider4.png'
import image5 from '../../images/Slider5.png'
import image6 from '../../images/Slider6.png'
import image7 from '../../images/Slider7.png'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const images = [image1, image2, image3, image4,image5,image6,image7];

function SliderC() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);
  const small = window.matchMedia('(max-width: 600px)')
    const settings = {
    
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  if(small.matches){
      settings.slidesToShow=3; 
  }
  return (
    <div className="App">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img src={img} alt={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderC;
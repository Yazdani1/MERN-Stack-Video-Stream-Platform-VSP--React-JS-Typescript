import { FC } from "react";
import "./MorePostsByUser.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserVideoPostCard from "../../components/UserVideoPostCard";

interface MorePostsByUserProps {
  video: string[];
}

const MorePostsByUser: FC<MorePostsByUserProps> = ({ video }) => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    adaptiveHeight: true,
    initialSlide: 0,
    autoplay: true,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container feedback-slider" id="testimonial">
      <div className="feedbck-slide">
        <Slider {...settings}>
          {video.map((v: any, index) => (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div style={{ margin: "10px" }} key={index}>
                <UserVideoPostCard video={v} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MorePostsByUser;

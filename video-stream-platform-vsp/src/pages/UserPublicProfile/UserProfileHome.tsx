import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import Skelton from "../../components/Skelton";
import { getUserNewlyPublishedPosts, getUserMostViewedPosts } from "../../API";
import UserVideoPostCard from "../../components/UserVideoPostCard";

const UserProfileHome = () => {
  const { slug } = useParams();

  const [newPublishedPosts, setNewPublishedPosts] = useState<any[]>([]);
  const [mostViewedPosts, setMostViewedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserNewlyPublishedPosts = async () => {
    setLoading(true);
    try {
      const res = await getUserNewlyPublishedPosts(slug);
      if (res) {
        setNewPublishedPosts(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  // to get user most  viewed video posts

  const loadUserMostViewedPosts = async () => {
    setLoading(true);
    try {
      const res = await getUserMostViewedPosts(slug);
      if (res) {
        setMostViewedPosts(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
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

  useEffect(() => {
    loadUserNewlyPublishedPosts();
    loadUserMostViewedPosts();
  }, []);

  return (
    <div className="container-fluid feedback-slidersss" id="testimonial">
      {/*///////////////////////*/}
      {/* New published posts   */}
      {/*///////////////////////*/}

      {loading ? (
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <Skelton />
            </div>
          ))}
        </div>
      ) : (
        <div className="feedbck-slide">
          <h6>New Published</h6>

          <Slider {...settings}>
            {newPublishedPosts.map((v: any, index) => (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div style={{ margin: "10px" }}>
                  <UserVideoPostCard video={v} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/*///////////////////////*/}
      {/* Most Viewed posts   */}
      {/*///////////////////////*/}

      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <h6>Most viewed</h6>

        <div className="row">
          {mostViewedPosts &&
            mostViewedPosts.map((video, index) => (
              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
                key={video._id}
              >
                <div style={{ margin: "10px" }}>
                  <UserVideoPostCard video={video} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default UserProfileHome;

import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import Skelton from "../../components/Skelton";

import { CategoryContext } from "../../ContextAPI/CategoryContext";
import PageLayout from "../PageLayout/PageLayout";
import { getAllTrendingPosts } from "../../API";
import VideoPostCard from "../../components/VideoPostCard";
import CardLayout from "../../components/CardLayout";
import ContainerMargin from "../../components/ContainerMargin";
import "./TrendingPosts.css";

const TrendingPosts = () => {
  const cateGoryList = useContext(CategoryContext);

  const [allTrendingPosts, setAllTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrendingPosts = async () => {
    setLoading(true);

    try {
      const res = await getAllTrendingPosts();

      if (res) {
        setAllTrendingPosts(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrendingPosts();
  }, []);

  return (
    <PageLayout>
      <ContainerMargin />

      <div className="container-fluid">
        <h6>Explore Category</h6>

        {loading ? (
          <div className="row">
            {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((item, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <Skelton />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {cateGoryList &&
              cateGoryList.map((category: any, index: any) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <Link
                    to={"/explore/category/" + category?.slug}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="explore-category" key={index}>
                      <h5>{category.categoryName}</h5>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}

        <ContainerMargin />

        <h6>Trending posts</h6>
        {loading ? (
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <Skelton />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {allTrendingPosts &&
              allTrendingPosts.map((video, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <div style={{ marginTop: "20px" }} key={index}>
                    <VideoPostCard video={video} />
                  </div>
                </div>
              ))}
          </div>
        )}

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default TrendingPosts;

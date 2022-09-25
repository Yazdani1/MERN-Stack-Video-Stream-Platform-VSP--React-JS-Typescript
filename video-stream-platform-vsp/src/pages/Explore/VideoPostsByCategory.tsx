import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import PageLayout from "../PageLayout/PageLayout";
import CardLayout from "../../components/CardLayout";
import { getPostsByCategory, getCategoryInfo } from "../../API";
import { CategoryListProps } from "../../DataProvider";
import VideoPostCard from "../../components/VideoPostCard";
import ContainerMargin from "../../components/ContainerMargin";
import "./TrendingPosts.css";
const VideoPostsByCategory = () => {
  const { slug } = useParams();

  const [allPosts, setAllPosts] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryListProps>();

  /****************************************/
  /*********   Category Details   ********/
  /****************************************/

  const loadCategoryDetails = async () => {
    try {
      const res = await getCategoryInfo(slug);

      if (res) {
        setCategoryDetails(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /********* All Posts by Category ********/
  /****************************************/

  const loadAllPosts = async () => {
    try {
      const res = await getPostsByCategory(slug);

      if (res) {
        setAllPosts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllPosts();
    loadCategoryDetails();
  }, []);

  return (
    <PageLayout>
      <ContainerMargin />

      <div className="container-fluid">
        <h4>
          {categoryDetails?.categoryName} - {allPosts.length} Posts{" "}
        </h4>
        <hr/>

        <div className="row">
          {allPosts &&
            allPosts.map((videopost: any, index: any) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={index}>
                <div style={{ marginTop: "20px" }}>
                  <VideoPostCard video={videopost} />
                </div>
              </div>
            ))}
        </div>

        {allPosts.length === 0 && (
          <CardLayout
            title="No posts in this category"
            backgroun_color="white"
          />
        )}

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default VideoPostsByCategory;

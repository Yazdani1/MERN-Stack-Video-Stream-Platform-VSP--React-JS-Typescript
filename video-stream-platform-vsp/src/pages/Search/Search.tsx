import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CardLayout from "../../components/CardLayout";
import PageLayout from "../PageLayout/PageLayout";
import ContainerMargin from "../../components/ContainerMargin";
import SearchResultPosts from "./SearchResultPosts";
import { searchVideoPosts } from "../../API";
import Skelton from "../../components/Skelton";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  const [loading, setLoading] = useState(true);

  const loadSearchedPosts = async () => {
    setLoading(true);

    try {
      const res = await searchVideoPosts(query);
      if (res) {
        setVideos(res.data);
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
    loadSearchedPosts();
  }, [query]);

  return (
    <PageLayout>
      <ContainerMargin />

      <div className="container-fluid">
        {loading ? (
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <Skelton />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {videos &&
              videos.map((video, index) => (
                <div
                  className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                  key={index}
                >
                  <div style={{ margin: "10px" }}>
                    <SearchResultPosts post={video} />
                    <hr />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {videos.length === 0 && (
        <CardLayout
          title="No posts with your search query! Try a different search"
          backgroun_color="white"
        />
      )}

      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default Search;

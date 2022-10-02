import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllVideoPostsRandomly } from "../../API";
import VideoPostCard from "../../components/VideoPostCard";
import Skelton from "../../components/Skelton";

const AllVideoPosts = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadAllPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllVideoPostsRandomly();

      if (res) {
        setAllPosts(res.data);
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
    loadAllPosts();
  }, []);

  return (
    <div className="container-fluid">
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
          {allPosts &&
            allPosts.map((video, index) => (
              <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
               
              >
                <div style={{ margin: "10px" }}  key={video._id}>
                  <VideoPostCard video={video} />
                </div>
              </div>
            ))}
        </div>
      )}

      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default AllVideoPosts;

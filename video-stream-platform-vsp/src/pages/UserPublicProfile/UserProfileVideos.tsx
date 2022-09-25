import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserAllPostsforPublicProfile } from "../../API";
import UserVideoPostCard from "../../components/UserVideoPostCard";

import Skelton from "../../components/Skelton";

const UserProfileVideos = () => {
  const { slug } = useParams();

  const [userAllPosts, setUserAllPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const loadUserAllPosts = async () => {
    setLoading(true);

    try {
      const res = await getUserAllPostsforPublicProfile(slug);

      if (res) {
        setUserAllPosts(res.data);
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
    loadUserAllPosts();
  }, []);

  return (
    <React.Fragment>
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
            {userAllPosts &&
              userAllPosts.map((video, index) => (
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
        )}

        <ToastContainer autoClose={8000} />
      </div>
    </React.Fragment>
  );
};

export default UserProfileVideos;

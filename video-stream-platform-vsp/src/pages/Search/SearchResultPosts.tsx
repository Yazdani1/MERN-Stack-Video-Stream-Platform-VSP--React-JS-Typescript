import React, { FC, useState, useContext } from "react";
import { MdWatchLater } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import { VideoPostListProps } from "../../DataProvider";
import "./SearchResultPosts.css";
import CardLayout from "../../components/CardLayout";
import ProfilePhotoAvatar from "../../components/ProfilePhotoAvatar";
import moment from "moment";
import { UserContext } from "../../ContextAPI/UserContext";

interface SearchResultPostsProps {
  post: VideoPostListProps;
}

const SearchResultPosts: FC<SearchResultPostsProps> = ({ post }) => {
  const [show, setShow] = useState(false);

  // to show tooltip
  const [tooltip, showTooltip] = useState(true);

  let navigate = useNavigate();

  const [currentUser] = useContext(UserContext);

  const viewFormatter = (num: any) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  };

  return (
    <Link
      to={"/watch/" + post.slug}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        className="container-fluid"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <CardLayout>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="post-image">
                <img className="img-fluid" src={post?.thumbnail} />
              </div>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="search-post-info">
                <div className="title-row">
                  <h6>{post.title}</h6>
                  <p
                    data-tip="Watch later"
                    onMouseEnter={() => showTooltip(true)}
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 50);
                    }}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!currentUser?.user) {
                        navigate("/signin");
                      }
                    }}
                  >
                    {show && <MdWatchLater size={25} />}
                  </p>
                </div>
                {post?.views >= 1000 ? (
                  <p>
                    {viewFormatter(post?.views)} views.
                    {moment(post?.date).format("MMM Do YY")}
                  </p>
                ) : (
                  <p>
                    {post?.views} views.{" "}
                    {moment(post?.date).format("MMM Do YY")}
                  </p>
                )}
                <ProfilePhotoAvatar
                  name={post?.postedBy?.name}
                  slug={post?.postedBy?.name}
                />
                <p>{post.des.substring(0, 200)}</p>
              </div>
            </div>
          </div>
        </CardLayout>
        {tooltip && <ReactTooltip place="bottom" type="dark" effect="solid" />}
      </div>
    </Link>
  );
};

export default SearchResultPosts;

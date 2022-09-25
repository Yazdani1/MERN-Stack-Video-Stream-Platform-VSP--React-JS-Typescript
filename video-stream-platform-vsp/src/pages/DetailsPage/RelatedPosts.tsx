import { FC, useState, useContext } from "react";
import moment from "moment";
import { FcOk } from "react-icons/fc";
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
import "./RelatedPosts.css";
import { UserContext } from "../../ContextAPI/UserContext";

interface RelatedPostsProps {
  video: VideoPostListProps;
  index?: number;
}

const RelatedPosts: FC<RelatedPostsProps> = ({ video, index }) => {
  let navigate = useNavigate();

  const [currentUser] = useContext(UserContext);

  const [show, setShow] = useState(false);
  // to show tooltip
  const [tooltip, showTooltip] = useState(true);

  const viewFormatter = (num: any) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  };

  return (
    <div
      className={
        index === 0
          ? "related-post-firstitem related-post-card"
          : "related-post-card"
      }
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        to={"/watch/" + video.slug}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 ">
            <div className="related-post-image">
              <img src={video.thumbnail} />
            </div>
          </div>

          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
            <div className="related-post-post-info">
              <div className="post-title-watchlater-button">
                <div>
                  <h6>{video.title.substring(0, 23)}</h6>
                </div>

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

              <Link
                to={"/channel/" + video?.postedBy?.slug}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p style={{ paddingTop: "5px" }}>
                  {video.postedBy.name} <FcOk />
                </p>
              </Link>

              {video?.views >= 1000 ? (
                <p>
                  {viewFormatter(video?.views)} views.
                  {moment(video?.date).format("MMM Do YY")}
                </p>
              ) : (
                <p>
                  {video?.views} views.{" "}
                  {moment(video?.date).format("MMM Do YY")}
                </p>
              )}

              <p> {video?.categoryBy?.categoryName}</p>
            </div>
          </div>
        </div>
      </Link>
      {tooltip && <ReactTooltip place="bottom" type="dark" effect="solid" />}
    </div>
  );
};

export default RelatedPosts;

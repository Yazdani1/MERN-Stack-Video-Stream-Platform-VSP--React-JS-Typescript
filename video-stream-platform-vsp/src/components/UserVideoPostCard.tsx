import { FC, useState,useContext } from "react";
import moment from "moment";
import { MdWatchLater } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { VideoPostListProps } from "../DataProvider";
import "./UserVideoPostCard.css";
import { UserContext } from "../ContextAPI/UserContext";

interface VideoPostCardProps {
  video: VideoPostListProps;
}

const UserVideoPostCard: FC<VideoPostCardProps> = ({ video }) => {

  let navigate = useNavigate();

  const [currentUser] = useContext(UserContext);

  const [show, setShow] = useState(false);


  const viewFormatter = (num: any) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  };
  // to show tooltip
  const [tooltip, showTooltip] = useState(true);

  return (
    <div
      className="card user_post_card_container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        to={"/watch/" + video.slug}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="user-video-thumbnail">
          <img className="img-fluid" src={video.thumbnail} />

          <p>{show && <FaPlayCircle color="white" size={90} />}</p>
        </div>
      </Link>

      <div className="user_post_details_container">
          <div className="user-post-details">
            <Link
              to={"/watch/" + video.slug}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h6>{video.title.substring(0, 20)}</h6>
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
          </div>
      

        <p
          data-tip="Watch later"
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }}
          style={{ cursor: "pointer" }}
          onClick={()=>{
            if(!currentUser?.user){
              navigate("/signin");
            }
          }}
        >
          {show && <MdWatchLater size={25} />}
        </p>
      </div>
      {tooltip && <ReactTooltip place="bottom" type="dark" effect="solid" />}
    </div>
  );
};

export default UserVideoPostCard;

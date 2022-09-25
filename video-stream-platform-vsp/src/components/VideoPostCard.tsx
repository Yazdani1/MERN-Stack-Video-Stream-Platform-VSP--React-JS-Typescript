import React, { FC, useState, useContext } from "react";
import moment from "moment";
import { FcOk } from "react-icons/fc";
import { FiMoreVertical } from "react-icons/fi";
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
import { UserContext } from "../ContextAPI/UserContext";

import "./VideoPostCard.css";
import { VideoPostListProps } from "../DataProvider";

interface VideoPostCardProps {
  video: VideoPostListProps;
}

const VideoPostCard: FC<VideoPostCardProps> = ({ video }) => {
  let navigate = useNavigate();

  const [currentUser] = useContext(UserContext);

  const [show, setShow] = useState(false);

  const [showMoreButton, setShowMoreButton] = useState(false);

  // to show tooltip
  const [tooltip, showTooltip] = useState(true);

  const viewFormatter = (num: any) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  };

  return (
    <div
      className="card main_card_container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        to={"/watch/" + video.slug}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="video-thumbnail">
          <img className="img-fluid" src={video.thumbnail} />

          <p>{show && <FaPlayCircle color="white" size={90} />}</p>
        </div>
      </Link>

      <div className="post-details">
        <div className="profile_pic_post_title">
          <Link
            to={"/channel/" + video.postedBy?.slug}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="user-list-user-image">
              <h6>{video.postedBy?.name.substring(0, 2)}</h6>
            </div>
          </Link>

          <div className="video-post-card-post-info">
            <Link
              to={"/watch/" + video.slug}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h6>{video.title.substring(0, 20)}</h6>
            </Link>

            <Link
              to={"/channel/" + video.postedBy?.slug}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                {video.postedBy?.name} <FcOk />
              </p>
            </Link>

            {video?.views >= 1000 ? (
              <p>
                {viewFormatter(video?.views)} views.
                {moment(video?.date).format("MMM Do YY")}
              </p>
            ) : (
              <p>
                {video?.views} views. {moment(video?.date).format("MMM Do YY")}
              </p>
            )}
          </div>
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
      {tooltip && <ReactTooltip place="left" type="dark" effect="solid" />}
    </div>
  );
};

export default VideoPostCard;

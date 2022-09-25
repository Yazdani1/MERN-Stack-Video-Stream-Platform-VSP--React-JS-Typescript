import React, { FC, useState, useContext, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import { GoReport } from "react-icons/go";
import ReactTooltip from "react-tooltip";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { VideoPostListProps } from "../../DataProvider";
import ProfilePhotoAvatar from "../../components/ProfilePhotoAvatar";
import { UserContext } from "../../ContextAPI/UserContext";
import { addLike, addDisLike, AddLikeToVideoPostsProps } from "../../API";
import "./SinglePost.css";
import {
  fetchStart,
  getSinglePostData,
  fetchFailure,
  like,
  dislike,
} from "../../redux/videoPostSlice";

interface SinglePostProps {
  post: VideoPostListProps;
  single_postid: string;
}

const SinglePost: FC<SinglePostProps> = ({ post, single_postid }) => {
  let navigate = useNavigate();

  // context api
  const [currentUser] = useContext(UserContext);

  // redux toolkit

  const userInfo = useSelector((state: any) => state.user.currentUser);
  const currentVideo = useSelector((state: any) => state.video.currentVideo);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [tooltip, showTooltip] = useState(true);

  const viewFormatter = (num: any) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setShow(false);
  };


  /****************************************/
  /*      Add Like and Dislike            */
  /****************************************/

  const addLikeToVideoPost = async () => {
    try {
      const payload: AddLikeToVideoPostsProps = { videopostId: single_postid };
      const res = await addLike(payload);
      if (res) {
        toast.success("You have liked this video", {
          position: toast.POSITION.TOP_RIGHT,
        });

        dispatch(like(userInfo?.user._id));
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const addDisLikeToVideoPost = async () => {
    try {
      const payload: AddLikeToVideoPostsProps = { videopostId: single_postid };
      const res = await addDisLike(payload);
      if (res) {
        toast.success("You have Disliked this video", {
          position: toast.POSITION.TOP_RIGHT,
        });

        dispatch(dislike(userInfo?.user._id));
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <React.Fragment>
      {tooltip && <ReactTooltip place="bottom" type="dark" effect="solid" />}

      <div className="video-player">
        <iframe
          className="responsive-iframe"
          src={post && post?.video}
          frameBorder="10"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ backgroundColor: "orange", border: "red" }}
        ></iframe>
      </div>

      <div className="single-post-details">
        <h5>{post?.title}</h5>

        <div className="single-post-heading-row">
          {post?.views >= 1000 ? (
            <p>
              {viewFormatter(post?.views)} views.
              {moment(post?.date).format("MMM Do YY")}
            </p>
          ) : (
            <p>
              {post?.views} views. {moment(post?.date).format("MMM Do YY")}
            </p>
          )}

          <div className="single-post-like-dislike-save-more">
            <p
              data-tip="I like this"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
              onClick={() => {
                if (!userInfo?.user) {
                  navigate("/signin");
                } else {
                  addLikeToVideoPost();
                }
              }}
            >
              <p>
                {currentVideo?.likes?.includes(userInfo?.user._id) ? (
                  <AiFillLike size={25} />
                ) : (
                  <AiOutlineLike size={25} />
                )}
                {currentVideo?.likes.length} LIKE
              </p>
            </p>

            <p
              data-tip="I dislike this"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
              onClick={() => {
                if (!userInfo?.user) {
                  navigate("/signin");
                } else {
                  addDisLikeToVideoPost();
                }
              }}
            >
              <p>
                {" "}
                {currentVideo?.dislikes?.includes(userInfo?.user._id) ? (
                  <AiFillDislike size={25} />
                ) : (
                  <AiOutlineDislike size={25} />
                )}
                {currentVideo?.dislikes.length} DISLIKE
              </p>
            </p>

            <p
              data-tip="Save"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
              onClick={() => {
                if (!userInfo?.user) {
                  navigate("/signin");
                } else {
                }
              }}
            >
              <MdPlaylistAdd size={25} /> SAVE
            </p>

            <p
              data-tip="Report video"
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
              onClick={() => {
                if (!userInfo?.user) {
                  navigate("/signin");
                }
              }}
            >
              <GoReport size={25} />
            </p>
          </div>
        </div>

        <hr />

        <ProfilePhotoAvatar
          name={post?.postedBy?.name}
          slug={post?.postedBy?.slug}
        />

        {show ? (
          <p style={{ marginTop: "15px" }}>{post?.des}</p>
        ) : (
          <p style={{ marginTop: "15px" }}>{post?.des.substring(0, 300)}</p>
        )}

        <div className="post-tag">
          {post?.tags.map((tag: any, index) => (
            <p className="tag-design" key={index}>
              {tag}
            </p>
          ))}
        </div>
        <Link to={"/explore/category/" + post?.categoryBy?.slug}
        style={{ textDecoration: "none", color: "black" }}
        >
          <p>{post?.categoryBy?.categoryName}</p>
        </Link>

        {show ? (
          <h6 onClick={handleCollapse} style={{ cursor: "pointer" }}>
            SHOW LESS
          </h6>
        ) : (
          <h6 onClick={handleShow} style={{ cursor: "pointer" }}>
            SHOW MORE
          </h6>
        )}
        <ToastContainer autoClose={8000} />
      </div>
    </React.Fragment>
  );
};

export default SinglePost;

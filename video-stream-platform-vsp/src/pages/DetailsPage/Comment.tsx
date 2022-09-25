import { useEffect, useState, useContext, FC } from "react";
import moment from "moment";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import { FcOk } from "react-icons/fc";
import { BsFlag } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

import { CommentListProps } from "../../DataProvider";
import "./Comment.css";

import { UserContext } from "../../ContextAPI/UserContext";

interface CommentProps {
  comment: CommentListProps;
  onDelete: (id: string) => void;
}

const Comment: FC<CommentProps> = ({ comment, onDelete }) => {


  const [currentUser] = useContext(UserContext);
  const [tooltip, showTooltip] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <div
      className="comment-profile-avatar"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        to={"/channel/" + comment.postedBy?.slug}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="profile-avatar-circle">
          <h6>{comment?.postedBy?.name?.substring(0, 2)}</h6>
        </div>
      </Link>

      <div className="comment-profile-name">
        <Link
          to={"/channel/" + comment.postedBy?.slug}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h6>
            {comment.postedBy?.name} .{" "}
            {moment(comment?.date).format("MMM Do YY")}
          </h6>
        </Link>

        <p style={{ display: "flex", flex: "3" }}>{comment.comment}</p>
      </div>

      {show && (
        <p
          data-tip="Report comment"
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }}
        >
          <BsFlag size={25} />
        </p>
      )}

      {currentUser?.user && (
        <button
          className="btn btn-danger"
          onClick={() => onDelete(comment._id)}
        >
          Delete
        </button>
      )}
      {tooltip && <ReactTooltip place="bottom" type="dark" effect="solid" />}
    </div>
  );
};

export default Comment;

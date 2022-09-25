import React, { FC } from "react";
import { FcOk } from "react-icons/fc";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import ReactPlayer from "react-player";
import "./ProfilePhotoAvatar.css"
import { VideoPostListProps, UserDetailsProps } from "../DataProvider";

interface ProfilePhotoAvatarProps {
  name?: any;
  slug?: string;
}

const ProfilePhotoAvatar: FC<ProfilePhotoAvatarProps> = ({ name, slug }) => {
  let navigate = useNavigate();

  // const navigateLink = () => navigate("/channel/" + slug);

  return (
    <Link
      to={"/channel/" + slug}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="user-profile-name-avatar">
        <div className="profile-avatar">
          <h6>{name?.substring(0, 2)}</h6>
        </div>

        <div className="profile-name">
          <h4>
            {name} <FcOk />
          </h4>


        </div>

      </div>
    </Link>
  );
};

export default ProfilePhotoAvatar;

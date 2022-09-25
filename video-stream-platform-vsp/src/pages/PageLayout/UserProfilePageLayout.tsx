import React, { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CardLayout from "../../components/CardLayout";
import { FcOk } from "react-icons/fc";
import UserProfileNavbar from "../../components/UserProfileNavbar/UserProfileNavbar";
import "./UserProfilePageLayout.css";
import PageLayout from "../PageLayout/PageLayout";
import { VideoPostListProps, UserDetailsProps } from "../../DataProvider";
import { getUserPublicProfileDetails } from "../../API";
import ContainerMargin from "../../components/ContainerMargin";
import ProfilePhotoAvatar from "../../components/ProfilePhotoAvatar";
import Skelton from "../../components/Skelton";

const UserProfilePageLayout = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const [userProfileInfo, setUserProfileInfo] = useState<UserDetailsProps>();

  const loadSingleUserDetails = async () => {
    setLoading(true);

    try {
      const res = await getUserPublicProfileDetails(slug);

      if (res) {
        setUserProfileInfo(res.data);
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
    loadSingleUserDetails();
  }, []);

  return (
    <PageLayout>
      <ContainerMargin />
      <CardLayout cardHeight="200px" backgroun_color="white" />

      {loading ? (
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <Skelton />
            </div>
          ))}
        </div>
      ) : (
        <CardLayout backgroun_color="white">
          <ProfilePhotoAvatar
            name={userProfileInfo?.name}
            slug={userProfileInfo?.slug}
          />

          <div style={{ marginTop: "20px" }}>
            <UserProfileNavbar slug={userProfileInfo?.slug} />
          </div>
        </CardLayout>
      )}

      <Outlet />
      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default UserProfilePageLayout;

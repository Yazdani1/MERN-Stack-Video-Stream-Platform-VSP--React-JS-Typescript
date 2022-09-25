import { useState } from "react";
import PageLayout from "../PageLayout/PageLayout";
import AllVideoPosts from "./AllVideoPosts";

const Home = () => {
  return (
    <PageLayout>
      <div className="container-fluid">
        <div className="user-profile-margin">
        <AllVideoPosts />

        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

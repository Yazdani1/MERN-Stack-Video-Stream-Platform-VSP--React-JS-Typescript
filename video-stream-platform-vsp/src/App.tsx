import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./ContextAPI/UserContext";
import { CategoryProvider } from "./ContextAPI/CategoryContext";
import SecureLayout from "./SecureLayout";
import CreateCategory from "./pages/Category/CreateCategory";
import VideoPosts from "./pages/VideoPosts/VideoPosts";
import UserProfileVideos from "./pages/UserPublicProfile/UserProfileVideos";
import UserProfileHome from "./pages/UserPublicProfile/UserProfileHome";
import UserProfilePageLayout from "./pages/PageLayout/UserProfilePageLayout";
import UserProfileCommunity from "./pages/UserPublicProfile/UserProfileCommunity";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import TrendingPosts from "./pages/Explore/TrendingPosts";
import VideoPostsByCategory from "./pages/Explore/VideoPostsByCategory";
import Search from "./pages/Search/Search";

const App = () => {
  return (
    <CategoryProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/watch/:slug" element={<DetailsPage />} />
            <Route path="/explore" element={<TrendingPosts />} />
            <Route path="/explore/category/:slug" element={<VideoPostsByCategory />} />

            <Route path="/search" element={<Search />} />


      
            {/* User Public Profile nested routing */}

            <Route path="channel/:slug" element={<UserProfilePageLayout />}>
              <Route index element={<UserProfileHome />} />
              <Route path="video" element={<UserProfileVideos />} />
              <Route path="community" element={<UserProfileCommunity />} />
            </Route>

            {/* Protected route */}

            <Route
              path="/dashboard"
              element={
                <SecureLayout>
                  <Dashboard />
                </SecureLayout>
              }
            />

            <Route
              path="/create-category"
              element={
                <SecureLayout>
                  <CreateCategory />
                </SecureLayout>
              }
            />

            <Route
              path="/create-video-posts"
              element={
                <SecureLayout>
                  <VideoPosts />
                </SecureLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </CategoryProvider>
  );
};

export default App;

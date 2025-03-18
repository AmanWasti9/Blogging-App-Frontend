import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import ViewBlog from "./Pages/ViewBlog/ViewBlog";
import "react-loading-skeleton/dist/skeleton.css";
import UserProvider from "./Context/UserProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import UserWriteBlog from "./Pages/UserRoutes/UserWriteBlog";
import UserProfile from "./Pages/UserRoutes/UserProfile";
import AllBlogsPage from "./Pages/PublicRoutes/AllBlogsPage";
import UserUpdateBlog from "./Pages/UserRoutes/UserUpdateBlog";
import UserLikedBlogs from "./Pages/UserRoutes/UserLikedBlogs";
import UserSavedBlogs from "./Pages/UserRoutes/UserSavedBlogs";
// import RegisterAndLogin from "./Pages/PublicRoutes/RegisterAndLogin/RegisterAndLogin";
import AllCategoriesPage from "./Pages/PublicRoutes/AllCategoriesPage";
import HomePage from "./Pages/PublicRoutes/HomePage";
import SingleCategoryBlog from "./Pages/PublicRoutes/SingleCategoryBlog";
import Navbar from "./Components/Navbar/Navbar";
// import GoToTop from "./Components/GoToTop/GoToTop";
import ChatBot from "./Components/ChatBot/ChatBot";
// import MobileRegister from "./Pages/PublicRoutes/RegisterAndLogin/MobileRegister";
import ResponsiveForm from "./Pages/PublicRoutes/RegisterAndLogin/ResponsiveForm";
import OurStoryPage from "./Pages/PublicRoutes/OurStoryPage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
    });
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-center" />
        <div className="pt-180px">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-and-login" element={<ResponsiveForm />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/categories" element={<AllCategoriesPage />} />
            <Route path="/blog/:postId" element={<ViewBlog />} />
            <Route path="/all-blogs" element={<AllBlogsPage />} />
            <Route path="/category/:categoryId" element={<SingleCategoryBlog />} />

            {/* Private Routes Only For Logged In User */}
            <Route path="/user" element={<PrivateRoutes />}>
              <Route path="write-blog" element={<UserWriteBlog />} />
              <Route path="user-profile/:userId" element={<UserProfile />} />
              <Route path="update-blog/:blogId" element={<UserUpdateBlog />} />
              <Route path="liked-blogs" element={<UserLikedBlogs />} />
              <Route path="saved-blogs" element={<UserSavedBlogs />} />
            </Route>
          </Routes>
        </div>

        <br />
        <br />
        {/* <GoToTop /> */}
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

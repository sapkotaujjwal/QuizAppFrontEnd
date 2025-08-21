// import "./studentPage.scss";

import SideNav from "./SideNav";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import StudentDashboard from "./StudentDashboard";
import BrowseQuiz from "./BrowseQuiz";
import PlayQuiz from "./playQuiz";
import MyStats from "./MyStats";
import ProfileSettings from "../ProfileSettings";
import { fetchUser } from "../../redux/userSlice"; // Adjust path if needed

const StudentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data); // Assuming state.user.data holds user info

  // Redirect to login if user is not logged in
  useEffect(() => {
    // Fetch user if not already fetched
    if (!user) {
      dispatch(fetchUser());
    }
    // If no user data, redirect to login
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, dispatch]);

  // Render nothing or a loading state while checking user
  if (!user) {
    return null; // Optionally, return <Loading /> if you have a Loading component
  }

  return (
    <div className="usdysn">
      <div
        className="hawashdusdbsds"
        style={{
          position: "fixed",
          top: "65px",
          left: "0px",
          zIndex: "1",
          backgroundColor: "#fff",
        }}
      >
        <SideNav />
      </div>

      <div className="others ms-[250px]">
        <Routes>
          <Route index element={<StudentDashboard />} /> {/* default /student */}
          <Route path="quiz" element={<BrowseQuiz />} />
          {/* <Route path="quiz/:id" element={<PlayQuiz />} /> */}
          <Route path="myStats" element={<MyStats />} />
          <Route path="profileSettings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentPage;
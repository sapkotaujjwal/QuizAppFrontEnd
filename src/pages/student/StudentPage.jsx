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
import Loading from "../../components/Loading"; // Import Loading component

const StudentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data); // User data
  const loading = useSelector((state) => state.user.loading); // Loading state
  const error = useSelector((state) => state.user.error); // Error state

  // Fetch user if not already fetched
  useEffect(() => {
    if (!user && !loading && !error) {
      dispatch(fetchUser());
    }
  }, [user, loading, error, dispatch]);

  // Redirect to login if user is not authenticated after fetch
  useEffect(() => {
    if (!loading && !user && error) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, error, navigate]);

  // Show loading state while fetching user
  if (loading) {
    return <Loading />;
  }

  // Show nothing or handle error if user fetch failed
  if (!user && error) {
    return null; // Optionally, render an Error component: <Error message={error} />
  }

  // Render the page if user is authenticated
  if (user) {
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
  }

  return null; // Fallback case (optional, should rarely hit this)
};

export default StudentPage;
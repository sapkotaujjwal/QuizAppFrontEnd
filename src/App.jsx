import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import UserDetails from "./components/UserDetails";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import StudentPage from "./pages/student/StudentPage";
import StaffPage from "./pages/staff/StaffPage";
import PlayQuiz from "./pages/student/playQuiz";

import { fetchUser } from "./redux/userSlice";
import { hideUserDetails, showUserDetails } from "./redux/basicSlice";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const basic = useSelector((state) => state.basic);
  const user = useSelector((state) => state.user);

  const showNav =
    location.pathname.startsWith("/school") || location.pathname === "/login";

  // Fetch user on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Handle redirects based on user role
  useEffect(() => {
    if (user.data && location.pathname === "/") {
      if (user.data.role === "student") {
        navigate("/student");
      } else {
        navigate("/staff");
      }
    }
  }, [user.data, location.pathname, navigate]);

  // Show loading while user data is being fetched
  if (user.loading) return <Loading />;
  if (user.error) return <Error {...user.error} />;

  return (
    <div>
      {!showNav && (
        <>
          <Navbar
            userDetailsController={() => {
              if (basic.userDetails) {
                dispatch(hideUserDetails());
              } else {
                dispatch(showUserDetails());
              }
            }}
          />
          {basic.userDetails && (
            <UserDetails
              user={user}
              onClose={() => dispatch(hideUserDetails())}
            />
          )}
        </>
      )}

      {basic.alert && <Alert {...basic.alert} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/staff/*" element={<StaffPage />} />
        <Route path="/student/*" element={<StudentPage />} />
        <Route path="/quiz/play/:id" element={<PlayQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

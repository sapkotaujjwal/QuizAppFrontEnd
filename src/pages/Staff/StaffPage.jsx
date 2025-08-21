import AdminDashboard from "../AdminDashboard";
import ProfileSettings from "../ProfileSettings";
import CreateNewQuestion from "./CreateNewQuestion";
import CreateQuiz from "./createQuiz";
import QuestionBank from "./QuestionBank";
import Quiz from "./Quiz";
import SideNav from "./SideNav";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllUser from "./AllUser";
import Analytics from "./Analytics";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/userSlice"; // Adjust path if needed
import Loading from "../../components/Loading"; // Import Loading component

const StaffPage = () => {
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
            <Route index element={<Quiz />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="users" element={<AllUser />} />

            <Route path="questionBank" element={<QuestionBank />} />
            <Route path="quiz/create" element={<CreateQuiz />} />
            <Route path="question/create" element={<CreateNewQuestion />} />
            <Route path="profile/settings" element={<ProfileSettings />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    );
  }

  return null; // Fallback case (optional, should rarely hit this)
};

export default StaffPage;

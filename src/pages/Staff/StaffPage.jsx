import AdminDashboard from "../AdminDashboard";
import ProfileSettings from "../ProfileSettings";
import CreateNewQuestion from "./CreateNewQuestion";
import CreateQuiz from "./createQuiz";
import CreateUser from "./CreateUser";
import QuestionBank from "./QuestionBank";
import Quiz from "./Quiz";
import SideNav from "./SideNav";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllUser from "./AllUser";
import Analytics from "./Analytics";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/userSlice"; // Adjust path if needed

const StaffPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data); // Assuming state.user.data holds user info
  const loading = useSelector((state) => state.user.loading); // Assuming state.user.loading holds loading state


  console.log(loading)


  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user && !loading) {
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
          <Route index element={<AdminDashboard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="users" element={<AllUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="questionBank" element={<QuestionBank />} />
          <Route path="quiz/create" element={<CreateQuiz />} />
          <Route path="question/create" element={<CreateNewQuestion />} />
          <Route path="profile/settings" element={<ProfileSettings />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffPage;

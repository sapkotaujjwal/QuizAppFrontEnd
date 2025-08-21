import AdminDashboard from "../AdminDashboard";
import ProfileSettings from "../ProfileSettings";
import CreateNewQuestion from "./CreateNewQuestion";
import CreateQuiz from "./createQuiz";
import CreateUser from "./CreateUser";
import QuestionBank from "./QuestionBank";
import Quiz from "./Quiz";
import SideNav from "./SideNav";
import { Route, Routes } from "react-router-dom";
import AllUser from "./AllUser";
import Analytics from "./Analytics";

const StaffPage = () => {
  return (
    <div className=" usdysn">
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

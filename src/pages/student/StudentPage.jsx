// import "./studentPage.scss";

import SideNav from "./SideNav";
import { Route, Routes } from "react-router-dom";

import StudentDashboard from "./StudentDashboard";
import BrowseQuiz from "./BrowseQuiz";
import PlayQuiz from "./playQuiz";
import MyStats from "./MyStats";
import ProfileSettings from "../ProfileSettings";

const StudentPage = () => {
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
          <Route index element={<StudentDashboard />} />{" "}
          {/* default /student */}
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

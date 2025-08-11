import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/Main/MainPage";
import GlobalStyles from "./GlobalStyles";
import PatientPage from "./pages/Patient/PatientPage";
import Prescription from "./pages/Prescription/PrescriptionPage";
import RemarkPage from "./pages/Remark/RemarkPage";
import SettingPage from "./pages/Settings/SettingPage";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/Signup/SignupPage";
import RemarkPersonalPage from "./pages/Remark/RemarkPersonal/RemarkPersonalPage";
import { useState } from "react";
import MainContentWithPatient from "./layouts/MainContentWithPatient";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null); //로그인한 유저의 정보를 담을거임

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage setUserData={setUserData} setIsLogin={setIsLogin} />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<MainLayout userData={userData} />}>
          <Route path="main" element={<MainPage />} />
          <Route element={<MainContentWithPatient />}>
            {/*여기부터는 우측에 환자 리스트 뜨는애들 */}
            <Route path="remark" element={<RemarkPage />} />
            <Route path="patient/:patientId/:round" element={<PatientPage />} />
            <Route
              path="prescription/:patientId/:round"
              element={<Prescription />}
            />
            <Route
              path="remark/:patientId/:round"
              element={<RemarkPersonalPage />}
            />
          </Route>
          <Route path="settings" element={<SettingPage {...userData} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

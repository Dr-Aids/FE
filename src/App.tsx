import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/Home/MainPage";
import GlobalStyles from "./GlobalStyles";
import PatientPage from "./pages/Patient/PatientPage";
import Prescription from "./pages/Prescription/PrescriptionPage";
import RemarkPage from "./pages/Remark/RemarkPage";
import SettingPage from "./pages/Settings/SettingPage";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/Signup/SignupPage";
import PatientLayout from "./layouts/PatientLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<MainLayout />}>
          <Route path="/main" element={<MainPage />} />
          <Route element={<PatientLayout />}>
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/remark" element={<RemarkPage />} />
          </Route>
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

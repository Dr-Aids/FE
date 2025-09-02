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
import RemarkPersonalPage from "./pages/RemarkPersonal/RemarkPersonalPage";
import MainContentWithPatient from "./layouts/MainContentWithPatient";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<MainLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route element={<MainContentWithPatient />}>
              {/*여기부터는 우측에 환자 리스트 뜨는애들 */}
              <Route path="remark" element={<RemarkPage />} />
              <Route
                path="patient/:patientId/:session"
                element={<PatientPage />}
              />
              <Route
                path="prescription/:patientId/:session"
                element={<Prescription />}
              />
              <Route
                path="remark/:patientId/:session"
                element={<RemarkPersonalPage />}
              />
            </Route>
            <Route path="settings" element={<SettingPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

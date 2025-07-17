import "./PatientLayout.css";
import { Outlet } from "react-router-dom";
import PatientsList from "../components/PatientsList";
import PatientInfo from "../components/PatientInfo";

export default function PatientLayout() {
  return (
    <div className="patient__layout__container">
      <section className="patient__layout__main">
        환자정보
        <nav className="patient__layout__header">
          <PatientInfo
            name="정연준"
            age={18}
            birth="2002.07.31"
            sex="남"
            disease={"당뇨병성 신종"}
          />
        </nav>
        <section>
          <Outlet />
        </section>
      </section>
      <PatientsList />
    </div>
  );
}

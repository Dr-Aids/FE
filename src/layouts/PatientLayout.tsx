import "./PatientLayout.css";
import { Outlet } from "react-router-dom";
import PatientsList from "../components/PatientsList";
import PatientInfo from "../components/PatientInfo";

export default function PatientLayout() {
  return (
    <div className="patient__layout__container">
      <section className="patient__layout__main">
        <nav>
          <PatientInfo
            name="정연준"
            age={18}
            birth="2002.07.31"
            sex="남"
            disease={"당뇨"}
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

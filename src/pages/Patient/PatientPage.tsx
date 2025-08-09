import "./PatientPage.css";

import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import PatientDetails from "./components/PatientDetails.tsx";
import PatientListPage from "../../components/PatientListPage.tsx";
import { patients } from "../../mocks/patientData.ts";
import { useParams } from "react-router-dom";

const patientList = patients; // 임시 환자 데이터

export default function PatientPage() {
  const patientId = useParams().patientId;
  const round = useParams().round;
  const patient = patientList.filter((p) => p.id === patientId)[0];
  const roundData = patient.rounds.filter(
    (r) => r.round.toString() === round?.toString()
  )[0];

  return (
    <div className="patient__page__container">
      <div className="patient__page__main__content">
        <PatientSummaryCard
          id={patient.id}
          name={patient.name}
          age={patient.age}
          birth={patient.birth}
          gender={patient.gender}
          disease={"당뇨병성 신종"}
          rounds={patient.rounds}
        />
        <PatientDetails {...roundData} />
      </div>

      <PatientListPage />
    </div>
  );
}

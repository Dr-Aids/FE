import { useParams } from "react-router-dom";
import PatientListPage from "../../../components/PatientListPage.tsx";
import PatientSummaryCard from "../../../components/PatientSummaryCard.tsx.tsx";
import { patients } from "../../../mocks/patientData.ts";
import RemarkPersonalDetails from "./components/RemarkPersonalDetails.tsx";
import "./RemarkPersonalPage.css";

const patientList = patients; // 임시 환자 데이터

export default function RemarkPersonalPage() {
  const patientId = useParams().patientId;
  const round = useParams().round;
  const patient = patientList.filter((p) => p.id === patientId)[0];
  const roundData = patient.rounds.filter(
    (r) => r.round.toString() === round?.toString()
  )[0];

  return (
    <div className="remark-personal__container">
      <div className="remark-personal__main__content">
        <PatientSummaryCard
          id={patient.id}
          name={patient.name}
          age={patient.age}
          birth={patient.birth}
          gender={patient.gender}
          disease={"당뇨병성 신종"}
          rounds={patient.rounds}
        />
        <RemarkPersonalDetails />
      </div>
      <PatientListPage />
    </div>
  );
}

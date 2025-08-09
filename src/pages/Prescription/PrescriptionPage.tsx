import { useParams } from "react-router-dom";
import PatientListPage from "../../components/PatientListPage";
import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import PrescriptionDetails from "./components/PrescriptionDetails.tsx";
import "./PrescriptionPage.css";
import { patients } from "../../mocks/patientData.ts";

const patientList = patients; // 임시 환자 데이터

export default function Prescription() {
  const patientId = useParams().patientId; // PageRow에서 해당 정해진 params로 이동시키고 여기서 받아오는 방식
  const round = useParams().round;
  const patient = patientList.filter((p) => p.id === patientId)[0];

  console.log(patient);
  return (
    <div className="prescription__page__container">
      <div className="prescription__main__content">
        <PatientSummaryCard
          id={patient.id}
          name={patient.name}
          age={patient.age}
          birth={patient.birth}
          gender={patient.gender}
          disease={"당뇨병성 신종"}
          rounds={patient.rounds}
        />
        <PrescriptionDetails />
      </div>

      <PatientListPage />
    </div>
  );
}

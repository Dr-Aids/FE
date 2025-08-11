import "./PatientPage.css";

import PatientDetails from "./components/PatientDetails.tsx";
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

  return <PatientDetails {...roundData} />;
}

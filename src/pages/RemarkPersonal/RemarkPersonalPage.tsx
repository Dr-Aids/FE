import { useParams } from "react-router-dom";
import { patients } from "../../mocks/patientData.ts";
import RemarkPersonalDetails from "./components/RemarkPersonalDetails.tsx";
import "./RemarkPersonalPage.css";

const patientList = patients; // 임시 환자 데이터

export default function RemarkPersonalPage() {
  const patientId = useParams().patientId;
  const round = useParams().round;
  const patient = patientList.filter((p) => p.id === patientId)[0];
  const nowRound = patient.rounds.filter(
    (r) => r.round.toString() === round?.toString()
  )[0];
  const prevRound = patient.rounds.filter(
    (r) => r.round.toString() === (Number(round) - 1).toString()
  )[0];

  return <RemarkPersonalDetails nowRound={nowRound} prevRound={prevRound} />;
}

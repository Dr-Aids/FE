import "./PatientDetails.css";
import PRELineChart from "../components/PRELineChart";
import Record from "./Record";
import BarGraph from "./BarGraph";
import WeightBox from "./WeightBox";
import Button from "../../../components/ui/Button";
import BloodLineChart from "../../../components/BloodLineChart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  Bp,
  BpNote,
  FiveSessionWeightList,
  WeightListItem,
} from "../../../types/PatientDetailTypes";

export default function PatientDetails() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();

  const [weightList, setWeightList] = useState<WeightListItem | null>();
  const [fiveSessionWeightList, setFiveSessionWeightList] = useState<
    FiveSessionWeightList[] | null
  >();
  const [records, setRecords] = useState<BpNote[]>([]);

  const [bp, setBp] = useState<Bp | null>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // 환자목록 fetching하는 함수
    const fetchWeight = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/session/weight?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const data = await response.json();
        // State에 값 넣어주는 지점
        setWeightList(data[0]);
      } catch (err) {
        console.log("에러메세지(fetchWeight) : ", err);
      }
    };

    const fetchFiveSessionWeight = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/session/weights?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const data = await response.json();
        // State에 값 넣어주는 지점
        setFiveSessionWeightList(data);
      } catch (err) {
        console.log("에러메세지(fetchFiveSessionWeight) : ", err);
      }
    };

    const fetchBp = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/session/bps?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const data = await response.json();
        // State에 값 넣어주는 지점
        setBp(data);
      } catch (err) {
        console.log("에러메세지(fetchBp) : ", err);
      }
    };

    const fetchBpNotes = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/session/bpnotes?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const data = await response.json();
        console.log(data);
        // State에 값 넣어주는 지점
        setRecords(data);
      } catch (err) {
        console.log("에러메세지(fetchBp) : ", err);
      }
    };

    // 실제 호출 부분
    Promise.all([
      fetchWeight(),
      fetchFiveSessionWeight(),
      fetchBp(),
      fetchBpNotes(),
    ]);
  }, [patientId, session]);

  return (
    <div className="patient-details__container">
      {weightList ? (
        <div className="patient__page__weight_list">
          <WeightBox title="Pre-Weight" weight={weightList.preWeight} />
          <WeightBox
            title="Average-Weight"
            weight={weightList?.averageWeight}
          />
          <WeightBox title="Dry-Weight" weight={weightList?.dryWeight} />
          <WeightBox title="Target UF" weight={weightList?.targetUF} />
          <WeightBox title="Post-Weight" weight={weightList?.postWeight} />
        </div>
      ) : (
        <div>몸무게 불러오는중...</div>
      )}

      <div className="patient__page__graph">
        *선택 회차의 최대 이전 5회까지만 표시됩니다.
        {fiveSessionWeightList ? (
          <div className="patient__page__graph_container">
            <div>
              <BarGraph data={fiveSessionWeightList} />
            </div>
            <div>
              <PRELineChart data={fiveSessionWeightList} />
            </div>
          </div>
        ) : (
          <div>이전 회차 몸무게 불러오는중...</div>
        )}
      </div>

      <div className="patient__bottom__container">
        <div className="patient__page__bp__chart__container">
          <div className="patient__page__bp__chart__header">
            혈압
            <div className="patient__page__bp__buttons">
              <Button content={"삭제"} />
              <Button content={"수정"} />
            </div>
          </div>
          <BloodLineChart data={bp} />
        </div>
        <Record records={records} />
      </div>
    </div>
  );
}

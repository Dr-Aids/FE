import { useParams } from "react-router-dom";
import BloodResultChart from "./components/Charts/BloodResultChart";
import HbLineChart from "./components/Charts/HbLineChart";
import "./PrescriptionPage.css";
import PrescriptionTable from "./components/PrescriptionTable";
import { useEffect, useState } from "react";
import type { BloodResult, Hb } from "../../types/PrescriptionTypes";
import EmptyDataState from "../../components/EmptyDataState";
import { API_URL } from "../../config";

export default function PrescriptionPage() {
  const { patientId, date: rawDate } = useParams<{
    patientId: string;
    date: string;
  }>();

  const date = rawDate!.slice(0, 7);

  const [bloodResult, setBloodResult] = useState<BloodResult[]>([]);
  const [hb, setHb] = useState<Hb[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchBloodResult = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `${API_URL}/blood-test/all?patientId=${patientId}&targetDate=${rawDate}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setBloodResult(data);
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    const fetchHb = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `${API_URL}/blood-test/only-hb?patientId=${patientId}&targetDate=${date}-01`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setHb(data);
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    Promise.all([fetchBloodResult(), fetchHb()]);
  }, [patientId, date]);

  if (date === "-1")
    return (
      <div className="card-container">
        <EmptyDataState
          type="bpnote"
          title={`처방내역이 존재하지 않습니다.`}
          description="아직 처방 내역이 존재하지 않습니다."
        />
      </div>
    );

  return (
    <div className="prescription__details__container">
      <div className="prescription__detail__graphs">
        <div className="prescription__blood__result__container card-container">
          <h3
            style={{
              color: "#1e6774",
            }}
          >
            혈액 검사 결과
          </h3>
          {bloodResult.length === 0 ? (
            <EmptyDataState
              type="bp"
              title="혈액 검사 결과가 없습니다"
              description=""
            />
          ) : (
            <BloodResultChart data={bloodResult} />
          )}
        </div>
        <div className="prescription__hb__container card-container">
          <h3
            style={{
              color: "#1e6774",
            }}
          >
            헤모글로빈
          </h3>
          {bloodResult.length === 0 ? (
            <EmptyDataState
              type="bpnote"
              title="헤모글로빈 기록이 존재하지 않습니다"
              description=""
            />
          ) : (
            <HbLineChart data={hb} />
          )}
        </div>
      </div>
      <PrescriptionTable patientId={patientId!} date={date!} />
    </div>
  );
}

import { useEffect, useState } from "react";
import type {
  RemarkBps,
  RemarkPersonal,
  RemarkWeightCmp,
} from "../../types/RemarkTypes";
import ContentBox from "./components/ContentBox";
import "./RemarkPersonalPage.css";
import RemarkPersonalTable from "./components/RemarkPersonalTable";
import WeightCMPChart from "./components/WeightCMPChart";
import { useParams } from "react-router-dom";
import type { Bp } from "../../types/PatientDetailTypes";
import BloodHistoryChart from "./components/BloodHistoryChart";

export interface TwoBpsItem {
  session: string;
  bloodPressureDto: Bp[];
}

export default function RemarkPersonalPage() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();
  const [nowSessionRemark, setNowSessionRemark] =
    useState<RemarkPersonal | null>(null);
  const [prevSessionRemark, setPrevSessionRemark] =
    useState<RemarkPersonal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bps, setBps] = useState<RemarkBps | null>(null);
  const [beforeTwoBps, setBeforeTwoBps] = useState<TwoBpsItem[] | null>(null);
  const [weightCmp, setWeightCmp] = useState<RemarkWeightCmp | null>(null);

  const startBpStr =
    bps?.startSbp != null && bps?.startDbp != null
      ? `${bps.startSbp}/${bps.startDbp}`
      : "데이터가 존재하지 않습니다.";

  const lastBpStr =
    bps?.lastSbp != null && bps?.lastDbp != null
      ? `${bps.lastSbp}/${bps.lastDbp}`
      : "데이터가 존재하지 않습니다.";

  const avgGapStr =
    weightCmp?.gapBetweenAverageAndNow != null
      ? `${Math.abs(weightCmp.gapBetweenAverageAndNow)} kg ` +
        (weightCmp.gapBetweenAverageAndNow >= 0 ? "증가" : "감소")
      : "데이터가 존재하지 않습니다.";

  const currentWeightStr =
    weightCmp?.beforePreWeight != null &&
    weightCmp?.gapBetweenBeforeAndNow != null
      ? `${weightCmp.beforePreWeight + weightCmp.gapBetweenBeforeAndNow} kg`
      : "데이터가 존재하지 않습니다.";

  useEffect(() => {
    // 1) 파라미터 변경 시 이전 화면 찌꺼기 제거
    setLoading(true);
    setNowSessionRemark(null);
    setPrevSessionRemark(null);
    setBps(null);
    setWeightCmp(null);

    const accessToken = localStorage.getItem("accessToken");

    const fetchPersonalRemark = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/special-note/patient/${patientId}/${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        const remarkSessions = data.sort(
          (a: RemarkPersonal, b: RemarkPersonal) => a.session - b.session
        );

        if (remarkSessions.length === 1) {
          // 1개 회차만 존재 -> prevSession으로 처리하자
          setPrevSessionRemark(remarkSessions[0]);
          setNowSessionRemark(null);
        } else if (remarkSessions.length === 2) {
          // 2개 다 존재하면, 순서대로 데이터 넘어오니까 첫번째가 이전데이터,2번째가 현재데이터
          setPrevSessionRemark(remarkSessions[0]);
          setNowSessionRemark(remarkSessions[1]);
        }
        setLoading(false);
      } catch (err) {
        console.log("에러메세지(fetchAllRemark) :", err);
      }
    };

    const fetchBps = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-pressure/special-note/current?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setBps(data);
      } catch (err) {
        console.log("에러메세지(fetchBps) :", err);
      }
    };

    const fetchWeightCmp = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/weight/special-note/compare?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setWeightCmp(data);
      } catch (err) {
        console.log("에러메세지(fetchBps) :", err);
      }
    };

    const fetchTwoBps = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-pressure/special-note/recent?patientId=${patientId}&session=${session}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const data: TwoBpsItem[] = await response.json();
        const ordedData = data.sort(
          (a, b) => Number(a.session) - Number(b.session)
        );
        setBeforeTwoBps(ordedData);
      } catch (err) {
        console.log("에러메세지(fetchBp) : ", err);
      }
    };

    Promise.all([
      fetchPersonalRemark(),
      fetchBps(),
      fetchWeightCmp(),
      fetchTwoBps(),
    ]);
  }, [patientId, session]);

  if (loading) return <span>로딩중...</span>;
  if (!nowSessionRemark && !prevSessionRemark)
    return <div>조회된 정보가 존재하지 않습니다.</div>;

  return (
    <div className="remark__personal__content__container">
      <div>
        <RemarkPersonalTable
          nowRound={nowSessionRemark!}
          prevRound={prevSessionRemark}
        />
      </div>
      <div className="remark__personal__graphs__container">
        <div className="blood__history__container">
          혈압기록
          {beforeTwoBps && <BloodHistoryChart data={beforeTwoBps} />}
        </div>
        <div className="content__box__list">
          현재회차
          <ContentBox title={"내원 시 BP"} content={startBpStr} />
          <ContentBox title={"현재 BP"} content={lastBpStr} />
          <ContentBox title={"평균 몸무게에 비해"} content={avgGapStr} />
          <ContentBox title={"현재 몸무게"} content={currentWeightStr} />
        </div>
        <div className="weight__cmp__container">
          몸무게 비교
          {session && weightCmp ? (
            <WeightCMPChart
              session={(parseInt(session) - 1).toString()}
              {...weightCmp}
            />
          ) : (
            <div>데이터가 존재하지 않습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

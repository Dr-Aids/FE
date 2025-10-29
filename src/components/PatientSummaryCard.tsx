import "./PatientSummaryCard.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { PatientSummaryHeader } from "../types/patientSummaryType";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import PatientInfoInput from "./PatientInfoInput";
import EditButton from "./ui/EditButton";
import TrashButton from "./ui/TrashButton";
import SessionInput from "./SessionInput";
import PlusButton from "./ui/PlusButton";
import { sortISOStrings } from "../utils/sortISOStrings";
import { API_URL } from "../config";

type SessionItem = {
  session: number;
  date: string;
};

export default function PatientSummaryCard() {
  const nav = useNavigate();
  const location = useLocation();
  const {
    patientId,
    session: rawSession,
    date: rawDate,
  } = useParams<{
    patientId: string;
    session?: string;
    date?: string;
  }>();
  const pageName = location.pathname.split("/")[1];

  const [patient, setPatient] = useState<PatientSummaryHeader | null>(null);
  const [sessions, setSessions] = useState<SessionItem[] | null>(null);
  const [prescriptionDates, setPrescriptionDates] = useState<string[]>([]);
  const [openPatientModify, setOpenPatientModify] = useState<boolean>(false);
  const [openAddSessionModal, setOpenAddSessionModal] =
    useState<boolean>(false);

  // 문자열 "undefined"/"null"/"" 정규화
  const normalize = (v?: string) =>
    v && v !== "undefined" && v !== "null" && v.trim() !== "" ? v : undefined;

  const session = normalize(rawSession);
  const date = normalize(rawDate);

  // 존재하지 않는 세션에 갔을 때 유효한 곳으로 리다이렉트 되도록 하는 로직
  // 여기 다시 손 좀 보자
  useEffect(() => {
    if (session && sessions) {
      // 쿼리 파라미터의 session이 존재할 때
      if (
        sessions.filter(
          (item) => item.session.toString() === session.toString()
        ).length === 0
      ) {
        // 만약 현재 url의 session이 유효한 session이 아니라면 0번 session으로 이동 -> 여기서 에러처리할거임

        nav(`/patient/${patientId}/0`);
      }
    }
  }, [sessions]);

  useEffect(() => {
    // 예측처방 페이지로 갔을 때

    if (date === undefined && pageName === "prescription") {
      nav(`/prescription/${patientId}/-1`);
    }
    if (date && prescriptionDates.length !== 0) {
      if (
        prescriptionDates.filter((item) => date.toString() === item.toString())
          .length === 0
      ) {
        nav(`/prescription/${patientId}/${prescriptionDates[0]}`);
      }
    }
  }, [prescriptionDates]);

  // 드롭다운의 선택값: session 모드면 session, 아니면 date(없으면 임시 기본값)
  const selectedValue = session
    ? `${patientId}/${session}`
    : `${patientId}/${date ?? prescriptionDates[0]}`;

  const token = localStorage.getItem("accessToken");

  const fetchPatientSummary = async () => {
    try {
      if (!token) throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`${API_URL}/patient/info/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.log("에러메세지(fetchPatientSummary) : ", err);
    }
  };

  const fetchPrescriptionDates = async () => {
    try {
      if (!token) throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `${API_URL}/prescriptions/dates?patientId=${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data: string[] = await res.json();

      // 중복 제거 후 최신순 정렬(원하면 'asc'로 변경)
      const uniq = Array.from(new Set(data));
      setPrescriptionDates(sortISOStrings(uniq, "asc"));
    } catch (err) {
      console.log("에러메세지(fetchPrescriptionDates) : ", err);
    }
  };

  const fetchAllSession = async () => {
    try {
      if (!token) throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`${API_URL}/session?patientId=${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 404) {
          console.log(
            `환자 ID(${patientId})에 대한 세션 정보가 없어 404 응답을 받았습니다.`
          );
          setSessions(null); // 세션이 없으므로 null로 설정
          return;
        }
        throw new Error(`HTTP Error - ${res.status}`);
      }

      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.log("에러메세지(fetchAllSession) : ", err);
      setSessions(null); // 에러 발생 시 null로 설정
    }
  };

  /** 1) 환자 정보는 항상 조회 */
  useEffect(() => {
    if (patientId) fetchPatientSummary();
    fetchPrescriptionDates();
  }, [patientId]);

  /** 2) session 파라미터가 있을 때만 세션 목록 조회 */
  useEffect(() => {
    if (!session) {
      // 세션 모드가 아니면 목록은 굳이 필요 없음(필요하면 null 유지)
      setSessions(null);
      return;
    }

    fetchAllSession();
  }, [patientId, session]);

  function handleChangeOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const address = e.target.value;
    nav(`/${pageName}/${address}`);
  }

  const handleClickDeletePatient = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`${API_URL}/patient/info/${patientId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

      nav("/patient");
    } catch (err) {
      console.log("에러메세지(환자 삭제) : ", err);
    }
  };

  const handleClickDeleteSession = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `${API_URL}/session?patientId=${patientId}&sessionId=${session}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      nav(`/patient/${patientId}/${sessions ? sessions[0].session : "0"}`);
    } catch (err) {
      console.log("에러메세지(투석 회차 삭제) : ", err);
    }
  };

  if (!patient) return <div>데이터 불러오는중...</div>;

  return (
    <div className="patient__info__container">
      <div className="patient__info__main">
        <div className="patient__info__info">
          <div className="patient__info__name">{patient.name}</div>
          <div className="patient__info__sex">
            {patient.gender === "MALE" ? "남" : "여"}
          </div>
          |
          <div>
            {patient.age}세 / {patient.birth}
          </div>
          |<div>{patient.disease}</div>|<div>담당의사 : {patient.pic}</div>
          {pageName === "patient" && (
            <div className="patient__info__buttons">
              <EditButton onClick={() => setOpenPatientModify(true)} />
              <TrashButton onClick={handleClickDeletePatient} />
            </div>
          )}
        </div>

        <div className="header__session__container">
          <form>
            <select
              className="patient__info__dropdown"
              onChange={handleChangeOption}
              value={selectedValue}
            >
              {session ? (
                // session 모드: 회차 목록
                sessions ? (
                  sessions.map((item) => (
                    <option
                      key={`${patient.id}/${item.session}-${item.date}`}
                      value={`${patient.id}/${item.session}`}
                    >
                      {item.session}회차 / {item.date}
                    </option>
                  ))
                ) : (
                  <option
                    value=""
                    hidden
                    style={{
                      color: "lightgray",
                    }}
                  >
                    회차를 추가해주세요
                  </option>
                )
              ) : (
                // month/date 모드: 월(또는 날짜) 목록
                prescriptionDates.map((m) => (
                  <option
                    key={`${patient.id}/${m}`}
                    value={`${patient.id}/${m}`}
                  >
                    {m.slice(0, 7)}월
                  </option>
                ))
              )}
            </select>
          </form>
          {pageName === "patient" && (
            <>
              <PlusButton onClick={() => setOpenAddSessionModal(true)} />
              {sessions && <TrashButton onClick={handleClickDeleteSession} />}
            </>
          )}
        </div>
      </div>
      <Modal
        title="환자 정보 수정"
        isOpen={openPatientModify}
        onClose={() => setOpenPatientModify(false)}
      >
        <PatientInfoInput
          patient={patient}
          onClose={() => setOpenPatientModify(false)}
          onPatientModified={fetchPatientSummary}
        />
      </Modal>
      <Modal
        title="투석 회차 추가"
        isOpen={openAddSessionModal}
        onClose={() => setOpenAddSessionModal(false)}
      >
        <SessionInput
          patientId={patientId!}
          onClose={() => setOpenAddSessionModal(false)}
          onSessionAdded={fetchAllSession}
        />
      </Modal>
    </div>
  );
}

import "./PatientPage.css";
import PRELineChart from "./components/Charts/PRELineChart";
import Record from "./components/Record";
import BarGraph from "./components/Charts/BarGraph";
import WeightBox from "./components/WeightBox";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type {
  Bp,
  BpNote,
  FiveSessionWeightList,
  WeightListItem,
} from "../../types/PatientDetailTypes";
import EditButton from "../../components/ui/EditButton";
import TrashButton from "../../components/ui/TrashButton";
import Modal from "../../components/Modal";
import WeightInput from "./components/WeightInput";
import { formatYMDTHM } from "../../utils/formatYMDTHM";
import PlusButton from "../../components/ui/PlusButton";
import BpInput from "./components/BpInput";
import BloodLineChart from "./components/Charts/BloodLineChart";
import EmptyDataState from "../../components/EmptyDataState";
import { API_URL } from "../../config";

export default function PatientPage() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();

  if (session?.toString() === "0")
    return (
      <div className="card-container">
        <EmptyDataState
          type="bpnote"
          title={`올바른 회차를 선택해주세요`}
          description="회차가 없다면 우측 상단에서 새로운 회차를 추가해주세요"
        />
      </div>
    );

  const [weightList, setWeightList] = useState<WeightListItem | null>(null);
  const [fiveSessionWeightList, setFiveSessionWeightList] = useState<
    FiveSessionWeightList[]
  >([]);
  const [records, setRecords] = useState<BpNote[]>([]);
  const [bp, setBp] = useState<Bp[]>([]);
  const [openWeightModal, setOpenWeightModal] = useState<boolean>(false);
  const [openWeightAddModal, setOpenWeightAddModal] = useState<boolean>(false);

  const [openBpModal, setOpenBpModal] = useState<boolean>(false);
  const [openBpModifyModal, setOpenBpModifyModal] = useState<boolean>(false);

  const accessToken = localStorage.getItem("accessToken");
  // 환자목록 fetching하는 함수
  const fetchWeight = async () => {
    try {
      if (!accessToken) throw new Error("잘못된 접근입니다");

      const response = await fetch(
        `${API_URL}/session/weight?patientId=${patientId}&session=${session}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();
      if (data.code === "SESSION_NOT_FOUND") setWeightList(null);
      if (!response.ok) {
        setWeightList(null);
        throw new Error(`HTTP Error - ${response.status}`);
      }

      // State에 값 넣어주는 지점
      setWeightList(data[0]);
    } catch (err) {
      console.log("에러메세지(fetchWeight) : ", err);
    }
  };
  const fetchBp = async () => {
    try {
      if (!accessToken) throw new Error("잘못된 접근입니다");

      const response = await fetch(
        `${API_URL}/session/bps?patientId=${patientId}&session=${session}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();
      if (data.code === "SESSION_NOT_FOUND") setBp([]);
      if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

      // State에 값 넣어주는 지점
      const newData = data.map((item: Bp) => ({
        ...item,
        time: formatYMDTHM(item.time).slice(9),
      }));
      console.log(newData);
      setBp(newData);
    } catch (err) {
      console.log("에러메세지(fetchBp) : ", err);
    }
  };

  const fetchBpNotes = async () => {
    try {
      if (!accessToken) throw new Error("잘못된 접근입니다");

      const response = await fetch(
        `${API_URL}/session/bpnotes?patientId=${patientId}&session=${session}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      if (data.code === "SESSION_NOT_FOUND") setRecords([]);
      if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

      const newData = data
        .filter((item: BpNote) => item.author !== null)
        .map((item: BpNote) => ({
          ...item,
          time: formatYMDTHM(item.time).slice(9),
        }));
      setRecords(newData);

      // State에 값 넣어주는 지점
    } catch (err) {
      console.log("에러메세지(fetchBp) : ", err);
    }
  };

  const fetchFiveSessionWeight = async () => {
    try {
      if (!accessToken) throw new Error("잘못된 접근입니다");

      const response = await fetch(
        `${API_URL}/session/weights?patientId=${patientId}&session=${session}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();
      if (data.code === "SESSION_NOT_FOUND") setFiveSessionWeightList([null]);
      if (!response.ok) {
        setFiveSessionWeightList([null]);
        throw new Error(`HTTP Error - ${response.status}`);
      }

      // State에 값 넣어주는 지점
      setFiveSessionWeightList(data);
    } catch (err) {
      console.log("에러메세지(fetchFiveSessionWeight) : ", err);
    }
  };

  useEffect(() => {
    // 실제 호출 부분
    Promise.all([
      fetchWeight(),
      fetchFiveSessionWeight(),
      fetchBp(),
      fetchBpNotes(),
    ]);
  }, [patientId, session]);

  const handleClickDeleteWeight = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `${API_URL}/weight?patientId=${patientId}&session=${session}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

      fetchWeight();
      fetchFiveSessionWeight();
    } catch (err) {
      console.log("에러메세지(몸무게 삭제) : ", err);
    }
  };

  return (
    <div className="patient-details__container">
      <div className="card-container ">
        <span className="weight__header">
          <h3
            style={{
              color: "#1e6774",
            }}
          >
            현재 회차 체중 정보
          </h3>

          <div className="weight__buttons">
            {weightList ? (
              <>
                <EditButton onClick={() => setOpenWeightModal(true)} />
                <TrashButton onClick={handleClickDeleteWeight} />
              </>
            ) : (
              ""
            )}

            {/* <EditButton onClick={() => setOpenWeightAddModal(true)} /> */}
          </div>
        </span>
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
          <>
            <EmptyDataState
              type="weight"
              title="체중 데이터가 없습니다"
              description="환자의 체중 측정 기록이 없습니다. 첫 번째 측정을 진행해주세요."
              actionText="추가하기"
              onAction={() => setOpenWeightAddModal(true)}
            />
          </>
        )}
      </div>

      <div className="card-container">
        <h3
          style={{
            color: "#1e6774",
          }}
        >
          최근 5회차 체중 정보
        </h3>
        {fiveSessionWeightList.includes(null) &&
        fiveSessionWeightList.length === 1 ? (
          <>
            <EmptyDataState
              type="weight"
              title="체중 데이터가 없습니다"
              description=""
            />
          </>
        ) : (
          <div className="patient__page__graph_container">
            <BarGraph data={fiveSessionWeightList} />
            <PRELineChart data={fiveSessionWeightList} />
          </div>
        )}
      </div>

      <div className="patient__bottom__container">
        <div className="patient__page__bp__chart__container card-container">
          <div className="patient__page__bp__chart__header">
            <h3
              style={{
                color: "#1e6774",
              }}
            >
              혈압
            </h3>
            <div className="patient__page__bp__buttons">
              {bp?.length === 0 ? (
                ""
              ) : (
                <>
                  <PlusButton onClick={() => setOpenBpModal(true)} />
                  <EditButton onClick={() => setOpenBpModifyModal(true)} />
                </>
              )}
            </div>
          </div>
          {bp?.length === 0 ? (
            <>
              <EmptyDataState
                type="bp"
                title="혈압 데이터가 없습니다"
                description="환자의 혈압 기록이 없습니다. 첫 번째 측정을 진행해주세요."
                onAction={() => setOpenBpModal(true)}
                actionText="추가하기"
              />
            </>
          ) : (
            <BloodLineChart data={bp} />
          )}
        </div>

        <Record
          records={records!}
          bps={bp!}
          session={session!}
          onChangedRecord={fetchBpNotes}
        />
      </div>

      <Modal
        title="체중 정보 수정"
        isOpen={openWeightModal}
        onClose={() => setOpenWeightModal(false)}
      >
        <WeightInput
          patientId={patientId!}
          session={session!}
          weightList={weightList!}
          onClose={() => setOpenWeightModal(false)}
          onChangedWeight={() => {
            fetchWeight();
            fetchFiveSessionWeight();
          }}
        />
      </Modal>

      <Modal
        title="체중 정보 등록"
        isOpen={openWeightAddModal}
        onClose={() => setOpenWeightAddModal(false)}
      >
        <WeightInput
          patientId={patientId!}
          session={session!}
          onClose={() => setOpenWeightAddModal(false)}
          onChangedWeight={() => {
            fetchWeight();
            fetchFiveSessionWeight();
          }}
        />
      </Modal>

      <Modal
        title="혈압 정보 등록"
        isOpen={openBpModal}
        onClose={() => setOpenBpModal(false)}
      >
        <BpInput
          patientId={patientId!}
          session={session!}
          onClose={() => setOpenBpModal(false)}
          onChangedBp={fetchBp}
        />
      </Modal>

      <Modal
        title="혈압 정보 수정"
        isOpen={openBpModifyModal}
        onClose={() => setOpenBpModifyModal(false)}
      >
        <BpInput
          patientId={patientId!}
          session={session!}
          bps={bp!}
          onClose={() => setOpenBpModifyModal(false)}
          onChangedBp={fetchBp}
        />
      </Modal>
    </div>
  );
}

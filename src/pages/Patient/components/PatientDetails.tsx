import "./PatientDetails.css";
import PRELineChart from "../components/PRELineChart";
import Record from "./Record";
import BarGraph from "./BarGraph";
import WeightBox from "./WeightBox";
import BloodLineChart from "../../../components/BloodLineChart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type {
  Bp,
  BpNote,
  FiveSessionWeightList,
  WeightListItem,
} from "../../../types/PatientDetailTypes";
import EditButton from "../../../components/ui/EditButton";
import TrashButton from "../../../components/ui/TrashButton";
import Modal from "../../../components/Modal";
import WeightInput from "./WeightInput";
import { formatYMDTHM } from "../../../utils/formatYMDTHM";
import PlusButton from "../../../components/ui/PlusButton";
import BpInput from "./BpInput";

export default function PatientDetails() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();

  if (session?.toString() === "0") return <div>회차가 존재하지 않습니다.</div>;

  const [weightList, setWeightList] = useState<WeightListItem | null>();
  const [fiveSessionWeightList, setFiveSessionWeightList] = useState<
    FiveSessionWeightList[] | null
  >();
  const [records, setRecords] = useState<BpNote[] | null>([]);
  const [bp, setBp] = useState<Bp[] | null>();
  const [openWeightModal, setOpenWeightModal] = useState<boolean>(false);
  const [openWeightAddModal, setOpenWeightAddModal] = useState<boolean>(false);

  const [openBpModal, setOpenBpModal] = useState<boolean>(false);
  const [openBpModifyModal, setOpenBpModifyModal] = useState<boolean>(false);

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

        const data = await response.json();
        if (data.code === "SESSION_NOT_FOUND") setWeightList(null);
        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

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

        const data = await response.json();
        if (data.code === "SESSION_NOT_FOUND") setFiveSessionWeightList(null);
        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

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

        const data = await response.json();
        if (data.code === "SESSION_NOT_FOUND") setBp(null);
        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        // State에 값 넣어주는 지점
        const newData = data.map((item) => ({
          ...item,
          time: formatYMDTHM(item.time).slice(9),
        }));
        setBp(newData);
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
        const data = await response.json();
        if (data.code === "SESSION_NOT_FOUND") setRecords(null);
        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);

        const newData = data.map((item) => ({
          ...item,
          time: formatYMDTHM(item.time).slice(9),
        }));
        setRecords(newData);

        // State에 값 넣어주는 지점
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

  const handleClickDeleteWeight = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `/api/weight?patientId=${patientId}&session=${session}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log("에러메세지(몸무게 삭제) : ", err);
    }
  };

  return (
    <div className="patient-details__container">
      {weightList ? (
        <div className="weight__wrapper">
          <span className="weight__header">
            <span>체중 정보</span>
            <div className="weight__buttons">
              <EditButton onClick={() => setOpenWeightModal(true)} />
              <TrashButton onClick={handleClickDeleteWeight} />
            </div>
          </span>
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
        </div>
      ) : (
        <div>
          몸무게 불러오는중...
          <EditButton onClick={() => setOpenWeightAddModal(true)} />
        </div>
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
              <PlusButton onClick={() => setOpenBpModal(true)} />
              <EditButton onClick={() => setOpenBpModifyModal(true)} />
            </div>
          </div>
          {bp ? (
            <BloodLineChart data={bp} />
          ) : (
            <div>혈압 데이터 불러오는중...</div>
          )}
        </div>
        <Record records={records} bps={bp!} session={session!} />
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
        />
      </Modal>
    </div>
  );
}

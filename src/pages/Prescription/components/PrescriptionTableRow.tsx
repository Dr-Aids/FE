import { Pencil, Trash2 } from "lucide-react";
import type { Prescription } from "../../../types/PrescriptionTypes";
import "./PrescriptionTable.css";
import Modal from "../../../components/Modal";
import PrescriptionInput from "./PrescriptionInput";
import { useState } from "react";

interface PrescriptionTableRowProps extends Prescription {
  index: number;
}

export default function PrescriptionTableRow({
  id,
  index,
  date,
  hematapoieticAgent,
  iu,
  description,
}: PrescriptionTableRowProps) {
  const newRow: Prescription = {
    id: id,
    date: date,
    hematapoieticAgent: hematapoieticAgent,
    iu: iu,
    description: description,
  };
  const [openPrescriptionModal, setOpenPrescriptionModal] =
    useState<boolean>(false);

  const handleClickDeletePrescription = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/prescriptions?prescriptionId=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.log("에러메세지(환자 삭제) : ", err);
    }
  };
  return (
    <>
      <tr
        className="prescription__tr"
        style={
          index % 2 === 0
            ? { backgroundColor: "#CBE8EE" }
            : { backgroundColor: "#E6F1FD" }
        }
      >
        <td>{date}</td>
        <td>{hematapoieticAgent}</td>
        <td>{iu}IU</td>
        <td>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </span>

            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Pencil
                size={20}
                style={{
                  border: "1px solid #ccc",
                  padding: "0.8rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                onClick={() => setOpenPrescriptionModal(true)}
              />
              <Trash2
                size={20}
                style={{
                  border: "1px solid #ccc",
                  padding: "0.8rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: "transparent",
                }}
                onClick={handleClickDeletePrescription}
              />
            </span>
          </div>
        </td>
      </tr>
      <div>
        <Modal
          title="처방 내역 수정"
          isOpen={openPrescriptionModal}
          onClose={() => setOpenPrescriptionModal(false)}
        >
          <PrescriptionInput
            onClose={() => setOpenPrescriptionModal(false)}
            prescription={newRow}
          />
        </Modal>
      </div>
    </>
  );
}

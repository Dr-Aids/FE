import PrescriptionTableRow from "./PrescriptionTableRow";
import "./PrescriptionTable.css";

import { useEffect, useState } from "react";
import type { Prescription } from "../../../types/PrescriptionTypes";

export default function PrescriptionTable({
  patientId,
  date,
}: {
  patientId: string;
  date: string;
}) {
  const [prescriptionData, setPrescriptionData] = useState<
    Prescription[] | null
  >(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchPrescription = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/prescriptions?patientId=${patientId}&targetDate=${date}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setPrescriptionData(data);
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    fetchPrescription();
  }, [patientId, date]);
  return (
    <div className="card-container">
      <table className="prescription__table">
        <thead className="prescription__thead">
          <tr>
            <th>Date</th>
            <th>Hematinic</th>
            <th>IU</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="prescription__tbody">
          {prescriptionData?.map((data, index) => (
            <PrescriptionTableRow {...data} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import "./RemarkAllPatients.css";
import BpIcon from "../../../assets/bp_icon.svg";
import WeightIcon from "../../../assets/weight_icon.svg";
import RemarkBasis from "./RemarkBasis";
import { useEffect, useState } from "react";
import type { RemarkPatient } from "../../../types/RemarkTypes";
import ruleNameToText from "../../../utils/ruleNameToText";

const TypeCell = ({ type }: { type: string }) => (
  <span className="type__container">
    <img src={type === "weight" ? WeightIcon : BpIcon} alt={type} />
    {type === "weight" ? "체중" : "혈압"}
  </span>
);

export default function RemarkAllPatients() {
  const [remarkPatients, setRemarkPatients] = useState<RemarkPatient[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchAllRemark = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch("/api/special-note/all", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setRemarkPatients(data);
      } catch (err) {
        console.log("에러메세지(fetchAllRemark) :", err);
      }
    };

    fetchAllRemark();
  }, []);

  return (
    <div className="remark__all__container">
      <div className="table-wrapper">
        <table className="remark__table">
          <thead className="remark__thead">
            <tr>
              <th scope="col">담당의</th>
              <th scope="col">환자명</th>
              <th scope="col">회차/날짜</th>
              <th scope="col">종류</th>
              <th scope="col">상태</th>
            </tr>
          </thead>
          <tbody className="remark__tbody">
            {remarkPatients.map((data) => (
              <tr key={`remark-all-patients-${data.id}`}>
                <td>{data.picname}</td>
                <td>{data.patientName}</td>
                <td>
                  {data.session}회차 / {data.date.replaceAll("-", ".")}
                </td>
                <td>
                  <TypeCell type={data.type} />
                </td>
                <td>{ruleNameToText(data)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="remark__basis__container">
        <RemarkBasis isWeight={false} />
        <RemarkBasis isWeight={true} />
      </div>
    </div>
  );
}

import type { RemarkPersonal, SpecialNote } from "../../../types/RemarkTypes";
import "./RemarkPersonalTable.css";

import ruleNameToText from "../../../utils/ruleNameToText";
import IconDataCard from "./IconDataCard";

const renderRemarks = (remarks: SpecialNote[] | undefined) => {
  if (!remarks || remarks.length === 0) {
    return "-";
  }
  return remarks.map((item, index) => (
    <span key={index} className="remark-item">
      {ruleNameToText(item)}
    </span>
  ));
};

export default function RemarkPersonalTable({
  nowRound,
  prevRound,
}: {
  nowRound: RemarkPersonal | null;
  prevRound: RemarkPersonal | null;
}) {
  console.log(nowRound);

  const nowWeightRemarks = nowRound?.specialNotes.filter(
    (item) => item.type === "weight"
  );
  const prevWeightRemarks = prevRound?.specialNotes.filter(
    (item) => item.type === "weight"
  );
  const nowBpRemarks = nowRound?.specialNotes.filter(
    (item) => item.type === "bloodPressure"
  );
  const prevBpRemarks = prevRound?.specialNotes.filter(
    (item) => item.type === "bloodPressure"
  );

  return (
    <div className="remark__personal__table__container">
      <table className="remark__personal__table">
        <thead>
          <tr>
            <th>구분</th>
            {prevRound && (
              <th>{`${prevRound.session}회차 / ${prevRound.date}`}</th>
            )}
            <th>
              {nowRound ? `${nowRound.session}회차 / ${nowRound.date}` : "-"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">상태</th>
            {prevRound && (
              <td>
                <div className="status-icons">
                  <IconDataCard
                    type="bp"
                    value={`${prevRound.sbp ?? "-"}/${prevRound.dbp ?? "-"}`}
                  />
                  <IconDataCard
                    type="weight"
                    value={`${prevRound.preWeight ?? "-"}`}
                  />
                </div>
              </td>
            )}
            <td>
              {nowRound ? (
                <div className="status-icons">
                  <IconDataCard
                    type="bp"
                    value={`${nowRound.sbp ?? "-"}/${nowRound.dbp ?? "-"}`}
                  />
                  <IconDataCard
                    type="weight"
                    value={`${nowRound.preWeight ?? "-"}`}
                  />
                </div>
              ) : (
                "-"
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">몸무게</th>
            {prevRound && <td>{renderRemarks(prevWeightRemarks)}</td>}
            <td>{renderRemarks(nowWeightRemarks)}</td>
          </tr>
          <tr>
            <th scope="row">혈압</th>
            {prevRound && <td>{renderRemarks(prevBpRemarks)}</td>}
            <td>{renderRemarks(nowBpRemarks)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

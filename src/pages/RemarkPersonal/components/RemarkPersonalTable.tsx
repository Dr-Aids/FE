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
            <th>
              <h3>구분</h3>
            </th>
            {prevRound && (
              <th>
                <h3>{`${prevRound.session}회차 / ${prevRound.date}`}</h3>
              </th>
            )}
            <th>
              <h3>
                {nowRound ? `${nowRound.session}회차 / ${nowRound.date}` : "-"}
              </h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <h3>상태</h3>
            </th>
            {prevRound && (
              <td>
                <div className="status-icons">
                  <IconDataCard
                    type="bp"
                    value={`${prevRound.sbp ?? "-"}/${prevRound.dbp ?? "-"}`}
                  />
                  <IconDataCard
                    type="weight"
                    value={
                      prevRound.preWeight == null
                        ? "-"
                        : prevRound.preWeight.toFixed(1)
                    }
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
                    value={
                      nowRound.preWeight == null
                        ? "-"
                        : nowRound.preWeight.toFixed(1)
                    }
                  />
                </div>
              ) : (
                "-"
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">
              <h3>몸무게</h3>
            </th>
            {prevRound && <td>{renderRemarks(prevWeightRemarks)}</td>}
            <td>{renderRemarks(nowWeightRemarks)}</td>
          </tr>
          <tr>
            <th scope="row">
              <h3>혈압</h3>
            </th>
            {prevRound && <td>{renderRemarks(prevBpRemarks)}</td>}
            <td>{renderRemarks(nowBpRemarks)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

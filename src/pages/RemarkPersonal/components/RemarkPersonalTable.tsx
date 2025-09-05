import type { RemarkPersonal } from "../../../types/RemarkTypes";
import "./RemarkPersonalTable.css";

import ruleNameToText from "../../../utils/ruleNameToText";
import IconDataCard from "./IconDataCard";

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
            <th>구분</th>
            <th scope="col">
              {prevRound === null
                ? "-"
                : prevRound.session + `회차 / ` + prevRound.date}
            </th>
            <th scope="col">
              {nowRound === null
                ? "-"
                : nowRound.session + `회차 / ` + nowRound.date}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">상태</th>
            <td>
              {prevRound === null ? (
                "-"
              ) : (
                <span
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <IconDataCard
                    type="bp"
                    value={`${prevRound.sbp}/${prevRound.dbp}`}
                  />
                  <IconDataCard
                    type="weight"
                    value={`${prevRound.preWeight}`}
                  />
                </span>
              )}
            </td>
            <td>
              {nowRound === null ? (
                "-"
              ) : (
                <span
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <IconDataCard
                    type="bp"
                    value={`${nowRound.sbp}/${nowRound.dbp}`}
                  />
                  <IconDataCard type="weight" value={`${nowRound.preWeight}`} />
                </span>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">몸무게</th>
            <td>
              {prevRound === null
                ? "-"
                : prevWeightRemarks!.length === 0
                ? "-"
                : prevWeightRemarks!.map((item) => (
                    <span>
                      {ruleNameToText(item)}
                      <br />
                    </span>
                  ))}
            </td>
            <td>
              {nowRound === null
                ? "-"
                : nowWeightRemarks!.length === 0
                ? "-"
                : nowWeightRemarks!.map((item) => (
                    <span>
                      {ruleNameToText(item)}
                      <br />
                    </span>
                  ))}
            </td>
          </tr>
          <tr>
            <th scope="row">혈압</th>
            <td>
              {prevRound === null
                ? "-"
                : prevBpRemarks!.length === 0
                ? "-"
                : prevBpRemarks!.map((item) => (
                    <span>
                      {ruleNameToText(item)}
                      <br />
                    </span>
                  ))}
            </td>
            <td>
              {nowRound === null
                ? "-"
                : nowBpRemarks!.length === 0
                ? "-"
                : nowBpRemarks!.map((item) => (
                    <span>
                      {ruleNameToText(item)}
                      <br />
                    </span>
                  ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

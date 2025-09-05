// PREV_DIFF_OVER_3.5KG
// AVG_DIFF_OVER_1KG
// START_BP_OVER_150
// START_BP_OVER_160
// START_BP_OVER_180
// BP_DROP_OVER_30

export default function ruleNameToText({
  ruleName,
  type,
  value,
}: {
  ruleName: string;
  type: "bloodPressure" | "weight";
  value: number;
}) {
  if (type === "weight") {
    if (ruleName === "PREV_DIFF_OVER_3.5KG")
      return `이전 투석 후 몸무게보다 ${value}kg 증가`;
    else return `평균 몸무게보다 ${value}kg 증가`;
  } else if (type === "bloodPressure") {
    if (
      ruleName === "START_BP_OVER_150" ||
      "START_BP_OVER_160" ||
      "START_BP_OVER_180"
    ) {
      return `투석 시작 시 혈압 높음 : ${value}`;
    } else if (ruleName === "BP_DROP_OVER_30") {
      return `투석중 혈압 저하 : ${value}`;
    }
  }
  return "존재하지 않는 특이사항 코드입니다.";
}

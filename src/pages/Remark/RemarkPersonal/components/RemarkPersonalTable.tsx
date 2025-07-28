import "./RemarkPersonalTable.css";

export default function RemarkPersonalTable() {
  return (
    <div className="remark__personal__table__container">
      <table className="remark__personal__table">
        <thead>
          <tr>
            <th>빈칸</th>
            <th scope="col" colSpan={2}>
              4회차
            </th>
            <th scope="col" colSpan={2}>
              5회차
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowSpan={2}>
              현재 상태
            </th>
            <td>투석 시작 전 혈압</td>
            <td>Pre-Weight</td>
            <td>투석 시작 전 혈압</td>
            <td>Pre-Weight</td>
          </tr>
          <tr>
            <td>151/70</td>
            <td>58.5</td>
            <td>170/100</td>
            <td>59</td>
          </tr>
          <tr>
            <th scope="row" rowSpan={2}>
              몸무게 특이사항
            </th>
            <td>평균 내원 몸무게 58.3</td>
            <td>0.2kg 증가 *특이사항 없음</td>
            <td>평균 내원 몸무게 58.2</td>
            <td>0.8kg 증가 *특이사항 없음</td>
          </tr>
          <tr>
            <td>평균 내원 몸무게 58.3</td>
            <td>0.2kg 증가 *특이사항 없음</td>
            <td>평균 내원 몸무게 58.2</td>
            <td>0.8kg 증가 *특이사항 없음</td>
          </tr>
          <tr>
            <th scope="row" rowSpan={2}>
              혈압 특이사항
            </th>
            <td colSpan={2}>
              투석 시작 전 혈압 151 , 1단계 고혈압 * 특이사항 있음
            </td>
            <td colSpan={2}>
              투석 시작 전 혈압 170/100 , 2단계 고혈압 * 특이사항 있음
            </td>
          </tr>
          <tr>
            <td>현재 혈압 135/65</td>
            <td>16 BP 감소 * 특이사항 없음</td>
            <td>현재 혈압 135/65</td>
            <td>16 BP 감소 * 특이사항 없음</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

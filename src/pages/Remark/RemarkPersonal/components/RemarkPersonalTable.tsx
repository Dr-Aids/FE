import "./RemarkPersonalTable.css";

export default function RemarkPersonalTable() {
  return (
    <div className="remark__personal__table__container">
      <table className="remark__personal__table">
        <thead>
          <tr>
            <th>구분</th>
            <th scope="col">4회차 / 2025.04.17</th>
            <th scope="col">5회차 / 2025.04.28</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">상태</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
          <tr>
            <th scope="row">몸무게</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
          <tr>
            <th scope="row">혈압</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

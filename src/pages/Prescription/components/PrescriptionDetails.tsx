import BloodResultChart from "./BloodResultChart";
import HbLineChart from "./HbLineChart";
import "./PrescriptionDetails.css";
import PrescriptionTable from "./PrescriptionTable";

export default function PrescriptionDetails() {
  return (
    <div className="prescription__details__container">
      <div className="prescription__detail__graphs">
        <div>
          혈액 검사 결과
          <BloodResultChart />
        </div>
        <div>
          헤모글로빈
          <HbLineChart />
        </div>
      </div>
      <PrescriptionTable />
    </div>
  );
}

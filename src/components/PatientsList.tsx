import "./PatientsList.css";
import Patient from "./Patient";

const patients = [
  { name: "김민준", age: 45, birth: "1979.03.15", sex: "남" },
  { name: "이서연", age: 32, birth: "1992.11.21", sex: "여" },
  { name: "박도현", age: 51, birth: "1973.07.02", sex: "남" },
  { name: "최지우", age: 28, birth: "1996.05.09", sex: "여" },
  { name: "정현우", age: 62, birth: "1962.01.25", sex: "남" },
  { name: "윤채원", age: 38, birth: "1986.09.12", sex: "여" },
  { name: "임시완", age: 41, birth: "1983.04.30", sex: "남" },
  { name: "송예은", age: 25, birth: "1999.08.18", sex: "여" },
  { name: "황민호", age: 55, birth: "1969.12.03", sex: "남" },
  { name: "안서진", age: 49, birth: "1975.06.28", sex: "여" },
];

export default function PatientsList() {
  return (
    <div className="patients__list__container">
      {patients.map((patient, i) => (
        <Patient key={i} {...patient} />
      ))}
    </div>
  );
}

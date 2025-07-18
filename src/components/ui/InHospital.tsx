import "./InHospital.css";

export default function InHospital({ nowHospital }) {
  return (
    <div
      className="in-hospital__icon"
      style={
        nowHospital
          ? { backgroundColor: "#94f374" }
          : { backgroundColor: "#FFCADA" }
      }
    ></div>
  );
}

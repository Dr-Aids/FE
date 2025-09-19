import "./InHospital.css";

export default function InHospitalIcon({
  inHospital,
}: {
  inHospital: boolean;
}) {
  return (
    <div
      className="in-hospital__icon"
      style={
        inHospital
          ? { backgroundColor: "#94f374" }
          : { backgroundColor: "#FFCADA" }
      }
    ></div>
  );
}

import "./Message.css";
import AiIcon from "../../../assets/main_logo.svg";
import DoctorIcon from "../../../assets/doctor_icon.svg";

export default function Message({ role }) {
  return (
    <div className={`message__container__${role}`}>
      <img
        className="message__profile"
        src={role === "ai" ? AiIcon : DoctorIcon}
      />
      <div>좋은 아침입니다.</div>
    </div>
  );
}

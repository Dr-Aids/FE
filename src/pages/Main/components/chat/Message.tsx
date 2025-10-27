import "./Message.css";
import AiIcon from "../../../../assets/main_logo.svg";
import DoctorIcon from "../../../../assets/doctor_icon.svg";

export default function Message({
  message,
  role,
}: {
  message: string;
  role: string;
}) {
  return (
    <div className={`message__container__${role}`}>
      <img
        className="message__profile"
        src={role === "ai" || role === "assistant" ? AiIcon : DoctorIcon}
        alt={role}
      />
      <div>{message}</div>
    </div>
  );
}

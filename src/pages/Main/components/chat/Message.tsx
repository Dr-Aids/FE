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
  // role 정규화: ai/assistant -> ai, 나머지는 user
  const normalizedRole = role === "ai" || role === "assistant" ? "ai" : "user";
  
  return (
    <div className={`message__container__${normalizedRole}`}>
      <img
        className="message__profile"
        src={normalizedRole === "ai" ? AiIcon : DoctorIcon}
        alt={normalizedRole}
      />
      <div>{message}</div>
    </div>
  );
}

import "./Message.css";
import AiIcon from "../../../../assets/main_logo.svg";
import DoctorIcon from "../../../../assets/doctor_icon.svg";
import ReactMarkdown from "react-markdown";

export default function Message({
  message,
  role,
  isLoading = false,
}: {
  message: string;
  role: string;
  isLoading?: boolean;
}) {
  // role 정규화: ai/assistant -> ai, 나머지는 user
  const normalizedRole = role === "ai" || role === "assistant" ? "ai" : "user";
  
  if (isLoading) {
    console.log("⏳ 로딩 애니메이션 렌더링 중");
  }
  
  return (
    <div className={`message__container__${normalizedRole}`}>
      <img
        className="message__profile"
        src={normalizedRole === "ai" ? AiIcon : DoctorIcon}
        alt={normalizedRole}
      />
      {isLoading ? (
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className="message__content">
          {normalizedRole === "ai" ? (
            <ReactMarkdown>{message}</ReactMarkdown>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>{message}</div>
          )}
        </div>
      )}
    </div>
  );
}

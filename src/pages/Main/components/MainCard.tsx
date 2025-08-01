import "./MainCard.css";
import VoiceIcon from "../../../assets/voice_icon.svg";
import DocumentIcon from "../../../assets/document_icon.svg";
import SmallChat from "./SmallChat";

export default function MainCard({ title }) {
  return (
    <div className="main__card__container">
      <div className="main__card__header">
        <div className="main__card__title">{title}</div>
        <img
          className="main__card__icon"
          src={title === "Q&A" ? VoiceIcon : DocumentIcon}
          alt="아이콘"
        />
      </div>
      <SmallChat />
    </div>
  );
}

import "./HistoryRow.css";
import SoundIcon from "../../../assets/sound_icon.svg";

export default function HistoryRow() {
  return (
    <div className="historyrow__container">
      <div className="historyrow__text__container">
        <div className="historyrow__time">날짜</div>
        <div className="historyrow__summary">내용 요약 설명입니다.</div>
      </div>
      <img src={SoundIcon} />
    </div>
  );
}

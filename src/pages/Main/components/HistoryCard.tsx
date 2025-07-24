import "./HistoryCard.css";
import HistoryIcon from "../../../assets/history_icon.svg";
import HistoryList from "./HistoryList";

export default function HistoryCard({ title }) {
  return (
    <div className="history__card__container">
      <div className="history__card__header">
        <img className="history__card__icon" src={HistoryIcon} alt="아이콘" />
        <div className="history__card__title">{title}</div>
      </div>
      <HistoryList />
    </div>
  );
}

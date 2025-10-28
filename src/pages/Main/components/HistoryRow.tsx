import "./HistoryRow.css";
import type { RoomResponse } from "../../../services/chatApi";

export default function HistoryRow({
  room,
  onRowClick,
  isSelected = false,
}: {
  room: RoomResponse;
  onRowClick: () => void;
  isSelected?: boolean;
}) {
  const date = new Date(room.createdAt);
  const dateStr = date.toLocaleDateString("ko-KR");
  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`historyrow__container ${isSelected ? "active" : ""}`}
      onClick={onRowClick}
    >
      <div className="historyrow__text__container">
        <div className="historyrow__time">
          {dateStr} {timeStr}
        </div>
        <div className="historyrow__summary">{room.title}</div>
      </div>
    </div>
  );
}

import "./HistoryRow.css";
import SoundIcon from "../../../assets/sound_icon.svg";
import type { RoomResponse } from "../../../services/chatApi";

export default function HistoryRow({
  room,
  onRowClick,
}: {
  room: RoomResponse;
  onRowClick: () => void;
}) {
  const date = new Date(room.createdAt);
  const dateStr = date.toLocaleDateString("ko-KR");
  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="historyrow__container" onClick={onRowClick}>
      <div className="historyrow__text__container">
        <div className="historyrow__time">
          {dateStr} {timeStr}
        </div>
        <div className="historyrow__summary">{room.title}</div>
      </div>
      <img src={SoundIcon} alt="사운드" />
    </div>
  );
}

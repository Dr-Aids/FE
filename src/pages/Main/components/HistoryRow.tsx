import "./HistoryRow.css";
import type { RoomResponse } from "../../../services/chatApi";
import { chatApi } from "../../../services/chatApi";
import { Trash2 } from "lucide-react";

export default function HistoryRow({
  room,
  onRowClick,
  isSelected = false,
  onDeleted,
}: {
  room: RoomResponse;
  onRowClick: () => void;
  isSelected?: boolean;
  onDeleted?: () => void;
}) {
  const date = new Date(room.createdAt);
  const dateStr = date.toLocaleDateString("ko-KR");
  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm("정말로 이 채팅방을 삭제하시겠습니까?")) return;

    try {
      await chatApi.deleteRoom(room.roomId);
      console.log("✅ 채팅방 삭제 완료:", room.roomId);
      
      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error("❌ 채팅방 삭제 실패:", error);
      alert("채팅방 삭제에 실패했습니다.");
    }
  };

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
      <button
        className="historyrow__delete-button"
        onClick={handleDelete}
        title="채팅방 삭제"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

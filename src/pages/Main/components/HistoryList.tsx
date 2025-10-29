import "./HistoryList.css";
import HistoryRow from "./HistoryRow";
import { useEffect, useState } from "react";
import { chatApi, type RoomResponse } from "../../../services/chatApi";

interface HistoryListProps {
  onRowClick: (roomId: string) => void;
  selectedRoomId?: string;
  refreshTrigger?: number;
}

export default function HistoryList({
  onRowClick,
  selectedRoomId,
  refreshTrigger = 0,
}: HistoryListProps) {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  const handleRoomDeleted = () => {
    setDeleteTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const loadRooms = async () => {
      try {
        console.log("📋 채팅방 목록 로딩 시작...");
        const data = await chatApi.getRooms();
        console.log("✅ 채팅방 목록 로드 성공:", data);
        console.log("- 채팅방 개수:", data.length);
        if (data.length > 0) {
          console.log("- 첫 번째 채팅방:", data[0]);
        }
        setRooms(data);
      } catch (error) {
        console.error("❌ 채팅방 목록 로드 실패:", error);
      }
    };
    loadRooms();
  }, [refreshTrigger, deleteTrigger]);

  if (rooms.length === 0) {
    return (
      <div className="historylist__container">
        <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          채팅 기록이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="historylist__container">
      {rooms.map((room) => (
        <HistoryRow
          key={room.roomId}
          room={room}
          onRowClick={() => onRowClick(room.roomId)}
          isSelected={room.roomId === selectedRoomId}
          onDeleted={handleRoomDeleted}
        />
      ))}
    </div>
  );
}

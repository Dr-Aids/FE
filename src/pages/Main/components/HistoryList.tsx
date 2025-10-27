import "./HistoryList.css";
import HistoryRow from "./HistoryRow";
import { useEffect, useState } from "react";
import { chatApi, type RoomResponse } from "../../../services/chatApi";

export default function HistoryList({
  onRowClick,
}: {
  onRowClick: (roomId: string) => void;
}) {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await chatApi.getRooms();
        setRooms(data);
      } catch (error) {
        console.error("채팅방 목록 로드 실패:", error);
      }
    };
    loadRooms();
  }, []);

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
      {rooms.slice(0, 6).map((room) => (
        <HistoryRow
          key={room.roomId}
          room={room}
          onRowClick={() => onRowClick(room.roomId)}
        />
      ))}
    </div>
  );
}

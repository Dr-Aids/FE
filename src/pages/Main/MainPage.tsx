import "./MainPage.css";
import { useState } from "react";
import HistoryList from "./components/HistoryList";
import SmallChat from "./components/chat/SmallChat";
import AudioHistoryList from "./components/AudioHistoryList";
import { chatApi } from "../../services/chatApi";

export default function MainPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleCreateNewRoom = async () => {
    if (isCreatingRoom) return;

    try {
      setIsCreatingRoom(true);
      const currentDate = new Date().toLocaleString("ko-KR");
      const newRoomId = await chatApi.createRoom(`채팅방 ${currentDate}`);
      
      console.log("새 채팅방 생성:", newRoomId);
      
      // 채팅방 목록 새로고침
      setRefreshTrigger((prev) => prev + 1);
      
      // 새로 생성된 채팅방 선택
      setSelectedRoomId(newRoomId);
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      alert("채팅방 생성에 실패했습니다.");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  return (
    <div className="main-page__container">
      {/* 채팅 기록 사이드바 */}
      <div className="main-page__sidebar">
        <div className="main-page__sidebar-header">
          <h2>채팅 기록</h2>
          <button
            className="main-page__new-chat-button"
            onClick={handleCreateNewRoom}
            disabled={isCreatingRoom}
          >
            {isCreatingRoom ? "생성 중..." : "+ 새 채팅"}
          </button>
        </div>
        <HistoryList
          onRowClick={handleRoomSelect}
          selectedRoomId={selectedRoomId}
          refreshTrigger={refreshTrigger}
        />
      </div>

      {/* Q&A 채팅 */}
      <div className="main-page__chat-container">
        <div className="main-page__chat-header">
          <h2>Q&A 채팅</h2>
        </div>
        <SmallChat roomId={selectedRoomId} />
      </div>

      {/* 오디오 기록 */}
      <div className="main-page__audio-history">
        <div className="main-page__audio-header">
          <h2>오디오 기록</h2>
        </div>
        <AudioHistoryList />
      </div>
    </div>
  );
}

import SectionHeader from "../../components/SectionHeader";
import HistoryCard from "./components/HistoryCard";
import MainCard from "./components/MainCard";
import "./MainPage.css";
import { useState } from "react";
import ChatModal from "./components/chat/ChatModal";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();

  const openModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoomId(undefined);
  };
  return (
    <div className="mainpage__container">
      <SectionHeader title={"AI 요약 및 응답"} />
      <div className="mainpage__top__content">
        <MainCard title={"Q&A"} />
        <MainCard title={"Summary"} />
        <HistoryCard title={"Q&A 기록"} onRowClick={(roomId) => openModal(roomId)} />
        <HistoryCard title={"Summary 기록"} onRowClick={(roomId) => openModal(roomId)} />
      </div>
      <ChatModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        roomId={selectedRoomId}
      />
    </div>
  );
}

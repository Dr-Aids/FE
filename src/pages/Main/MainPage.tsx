import SectionHeader from "../../components/SectionHeader";
import HistoryCard from "./components/HistoryCard";
import MainCard from "./components/MainCard";
import "./MainPage.css";
import { useState } from "react";
import ChatModal from "./components/ChatModal";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mainpage__container">
      <SectionHeader title={"AI 요약 및 응답"} />
      <div className="mainpage__top__content">
        <MainCard title={"Q&A"} />
        <MainCard title={"Summary"} />
        <HistoryCard title={"Q&A 기록"} onRowClick={openModal} />
        <HistoryCard title={"Summary 기록"} onRowClick={openModal} />
      </div>
      <ChatModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

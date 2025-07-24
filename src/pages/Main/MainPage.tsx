import SectionHeader from "../../components/SectionHeader";
import HistoryCard from "./components/HistoryCard";
import MainCard from "./components/MainCard";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="mainpage__container">
      <SectionHeader title={"AI 요약 및 응답"} />
      <hr />
      <div className="mainpage__top__content">
        <MainCard title={"Q&A"} />
        <MainCard title={"Summary"} />
        <HistoryCard title={"Q&A 기록"} />
        <HistoryCard title={"Summary 기록"} />
      </div>
    </div>
  );
}

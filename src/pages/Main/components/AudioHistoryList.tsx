import "./HistoryList.css";
import AudioHistoryRow from "./AudioHistoryRow";
import { useEffect, useState } from "react";
import { chatApi, type AudioListItem } from "../../../services/chatApi";

export default function AudioHistoryList() {
  const [audioList, setAudioList] = useState<AudioListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAudioList = async () => {
      try {
        setIsLoading(true);
        const data = await chatApi.getAudioList();
        console.log("📋 오디오 리스트 로드 완료:", data);
        setAudioList(data);
      } catch (error) {
        console.error("오디오 리스트 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAudioList();
  }, []);

  if (isLoading) {
    return (
      <div className="historylist__container">
        <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          로딩 중...
        </div>
      </div>
    );
  }

  if (audioList.length === 0) {
    return (
      <div className="historylist__container">
        <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          오디오 기록이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="historylist__container">
      {audioList.map((audio) => (
        <AudioHistoryRow key={audio.id} audio={audio} />
      ))}
    </div>
  );
}


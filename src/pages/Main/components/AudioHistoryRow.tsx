import { useRef, useState } from "react";
import "./HistoryRow.css";
import SoundIcon from "../../../assets/sound_icon.svg";
import type { AudioListItem } from "../../../services/chatApi";
import { chatApi } from "../../../services/chatApi";

export default function AudioHistoryRow({ audio }: { audio: AudioListItem }) {
  const date = new Date(audio.date);
  const dateStr = date.toLocaleDateString("ko-KR");
  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSoundClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      // 이미 재생 중이면 일시정지
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      // 이미 로드된 오디오가 있고 일시정지 상태면 재개
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }

      // 새로운 오디오 파일 로드
      setIsLoading(true);
      console.log("🎵 오디오 파일 요청 시작 - audioId:", audio.audioId);

      const audioBlob = await chatApi.getAudioFile(audio.audioId);

      if (audioBlob.size === 0) {
        throw new Error("오디오 파일이 비어있습니다.");
      }

      const audioUrl = URL.createObjectURL(audioBlob);

      // 기존 오디오가 있으면 정리
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audioElement = new Audio(audioUrl);
      audioRef.current = audioElement;

      // 재생 종료 이벤트 리스너
      audioElement.onended = () => {
        console.log("🎵 오디오 재생 종료");
        setIsPlaying(false);
      };

      // 오류 처리
      audioElement.onerror = () => {
        console.error("❌ 오디오 재생 오류");
        setIsPlaying(false);
        setIsLoading(false);
        alert("오디오 재생 중 오류가 발생했습니다.");
      };

      await audioElement.play();
      setIsPlaying(true);
      setIsLoading(false);
      console.log("✅ 오디오 재생 중");
    } catch (error) {
      console.error("❌ 오디오 재생 실패:", error);
      if (error instanceof Error) {
        alert(`오디오 파일을 재생할 수 없습니다.\n오류: ${error.message}`);
      } else {
        alert("오디오 파일을 재생할 수 없습니다.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="historyrow__container">
      <div className="historyrow__text__container">
        <div className="historyrow__time">
          {dateStr} {timeStr}
        </div>
        <div className="historyrow__summary">{audio.text}</div>
      </div>
      <img
        src={SoundIcon}
        alt="사운드"
        onClick={handleSoundClick}
        className={`historyrow__sound-icon ${isPlaying ? "playing" : ""} ${
          isLoading ? "loading" : ""
        }`}
      />
    </div>
  );
}


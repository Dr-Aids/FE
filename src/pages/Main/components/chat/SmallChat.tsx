import "./SmallChat.css";
import SendButton from "../../../../assets/message_send_button.svg";
import Messages from "./Messages";
import { useState, useRef, useEffect } from "react";
import { WebSocketChatService } from "../../../../services/websocketChat";
import { chatApi } from "../../../../services/chatApi";

interface SmallChatProps {
  roomId?: string;
}

export default function SmallChat({ roomId: propRoomId }: SmallChatProps) {
  const [roomId, setRoomId] = useState(propRoomId || "");
  
  const [messages, setMessages] = useState<Array<{ message: string; role: string }>>([]);
  
  const [inputValue, setInputValue] = useState("");
  const [isWaitingForAI, setIsWaitingForAI] = useState(false);
  const wsServiceRef = useRef<WebSocketChatService | null>(null);

  // propRoomId가 변경되면 roomId 업데이트
  useEffect(() => {
    if (propRoomId && propRoomId !== roomId) {
      console.log("채팅방 전환:", propRoomId);
      setRoomId(propRoomId);
      setMessages([]); // 메시지 초기화
      setInputValue(""); // 입력창 초기화
    }
  }, [propRoomId, roomId]);

  // 메시지 히스토리 로드
  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      try {
        console.log("메시지 로드 중:", roomId);
        const data = await chatApi.getRecentMessages(roomId);
        setMessages(data);
      } catch (error) {
        console.error("메시지 히스토리 로드 실패:", error);
      }
    };

    loadMessages();
  }, [roomId]);

  useEffect(() => {
    // roomId가 prop으로 전달되지 않은 경우, 기본 채팅방 가져오기
    if (!propRoomId) {
      const loadDefaultRoom = async () => {
        try {
          const rooms = await chatApi.getRooms();
          if (rooms.length > 0) {
            setRoomId(rooms[0].roomId);
          } else {
            // 채팅방이 없으면 새로 생성
            const newRoom = await chatApi.createRoom("Q&A 채팅방");
            setRoomId(newRoom);
          }
        } catch (error) {
          console.error("채팅방 로드 실패:", error);
        }
      };
      loadDefaultRoom();
    }
  }, [propRoomId]);

  useEffect(() => {
    if (!roomId) return; // roomId가 없으면 연결하지 않음

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token이 없습니다.");
      return;
    }

    wsServiceRef.current = new WebSocketChatService(
      token,
      roomId,
      (msg) => {
        console.log("[RECV]", msg.role, ":", msg.message);
        
        // 사용자 메시지는 이미 UI에 표시했으므로 무시
        if (msg.role === "user") {
          console.log("ℹ️ 사용자 메시지 echo 무시");
          return;
        }
        
        // AI 메시지만 추가
        if (msg.role === "ai" || msg.role === "assistant") {
          console.log("✅ AI 응답 수신, 로딩 해제");
          setMessages((prev) => [
            ...prev,
            { message: msg.message, role: msg.role || "ai" },
          ]);
          setIsWaitingForAI(false);
        }
      },
      (err) => {
        console.error("[ERROR]", err);
        // 에러 발생 시에도 로딩 상태 해제
        setIsWaitingForAI(false);
      },
      () => console.log("[CONNECTED]")
    );

    wsServiceRef.current.connect();

    return () => {
      if (wsServiceRef.current) {
        wsServiceRef.current.disconnect();
      }
    };
  }, [roomId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !wsServiceRef.current || isWaitingForAI) return;

    const userMessage = inputValue.trim();
    
    // 사용자 메시지를 즉시 UI에 표시
    setMessages((prev) => [
      ...prev,
      { message: userMessage, role: "user" },
    ]);
    
    // AI 응답 대기 중 상태로 전환
    setIsWaitingForAI(true);
    console.log("🔄 AI 응답 대기 중...", { isWaitingForAI: true });
    
    console.log("[SEND] Sending message:", userMessage, "to room:", roomId);
    wsServiceRef.current.sendMessage(userMessage);
    setInputValue("");
  };

  return (
    <div className="smallchat__container">
      <Messages messages={messages} isWaitingForAI={isWaitingForAI} />

      <form className="smallchat__form" onSubmit={handleSubmit}>
        <input
          placeholder="메세지 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isWaitingForAI}
          style={{ 
            opacity: isWaitingForAI ? 0.6 : 1,
            cursor: isWaitingForAI ? 'not-allowed' : 'text'
          }}
        />
        <button type="submit" disabled={isWaitingForAI}>
          <img src={SendButton} alt="전송" />
        </button>
      </form>
    </div>
  );
}

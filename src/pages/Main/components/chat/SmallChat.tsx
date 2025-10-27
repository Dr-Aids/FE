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

  // 메시지 히스토리 로드
  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      try {
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
        
        // 메시지 추가
        setMessages((prev) => [
          ...prev,
          { message: msg.message, role: msg.role || "ai" },
        ]);
        
        // AI 응답을 받으면 로딩 상태 해제
        if (msg.role === "ai" || msg.role === "assistant") {
          setIsWaitingForAI(false);
        }
        
        // 사용자 메시지를 받았을 때도 로딩 상태 해제 (에러 방지)
        if (msg.role === "user") {
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
    
    // AI 응답 대기 중 상태로 전환
    setIsWaitingForAI(true);
    
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

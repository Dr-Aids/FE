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
        setMessages((prev) => [
          ...prev,
          { message: msg.message, role: msg.role || "ai" },
        ]);
      },
      (err) => console.error("[ERROR]", err),
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
    if (!inputValue.trim() || !wsServiceRef.current) return;

    // 사용자 메시지를 즉시 추가
    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { message: userMessage, role: "user" }]);
    
    console.log("[SEND] Sending message:", userMessage, "to room:", roomId);
    wsServiceRef.current.sendMessage(userMessage);
    setInputValue("");
  };

  return (
    <div className="smallchat__container">
      <Messages messages={messages} />

      <form className="smallchat__form" onSubmit={handleSubmit}>
        <input
          placeholder="메세지 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <img src={SendButton} alt="전송" />
        </button>
      </form>
    </div>
  );
}

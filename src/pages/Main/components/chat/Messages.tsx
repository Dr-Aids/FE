import Message from "./Message";
import "./Messages.css";
import { useEffect, useRef, useLayoutEffect } from "react";

interface MessagesProps {
  messages: Array<{ message: string; role: string }>;
  isWaitingForAI?: boolean;
}

export default function Messages({ messages, isWaitingForAI = false }: MessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // 메시지가 추가되거나 로딩 상태가 변경될 때 자동 스크롤
  useLayoutEffect(() => {
    // 첫 로드 시에는 즉시 스크롤
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, []);

  useEffect(() => {
    console.log("📨 Messages 상태 업데이트:", {
      messageCount: messages.length,
      isWaitingForAI: isWaitingForAI,
    });
    // 새 메시지가 추가될 때 부드럽게 스크롤
    scrollToBottom();
  }, [messages, isWaitingForAI]);

  return (
    <div className="messages__container" ref={messagesContainerRef}>
      {messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
          메시지가 없습니다.
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <Message key={idx} message={msg.message} role={msg.role} />
          ))}
          {isWaitingForAI && <Message message="" role="ai" isLoading={true} />}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}

import Message from "./Message";
import "./Messages.css";
import { useEffect, useRef } from "react";

interface MessagesProps {
  messages: Array<{ message: string; role: string }>;
  isWaitingForAI?: boolean;
}

export default function Messages({ messages, isWaitingForAI = false }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaitingForAI]);

  return (
    <div className="messages__container">
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

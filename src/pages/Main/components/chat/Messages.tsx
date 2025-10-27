import Message from "./Message";
import "./Messages.css";

interface MessagesProps {
  messages: Array<{ message: string; role: string }>;
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="messages__container">
      {messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
          메시지가 없습니다.
        </div>
      ) : (
        messages.map((msg, idx) => (
          <Message key={idx} message={msg.message} role={msg.role} />
        ))
      )}
    </div>
  );
}

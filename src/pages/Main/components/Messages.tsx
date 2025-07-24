import Message from "./Message";
import "./Messages.css";

export default function Messages() {
  return (
    <div className="messages__container">
      <Message role={"ai"} /> <Message role={"doctor"} />
      <Message role={"ai"} /> <Message role={"doctor"} />
    </div>
  );
}

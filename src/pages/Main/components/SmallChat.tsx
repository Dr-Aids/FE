import "./SmallChat.css";
import SendButton from "../../../assets/message_send_button.svg";
import Messages from "./Messages";
export default function SmallChat() {
  return (
    <div className="smallchat__container">
      <Messages />
      <form className="smallchat__form">
        <input placeholder="메세지 입력" />
        <button>
          <img src={SendButton} />
        </button>
      </form>
    </div>
  );
}

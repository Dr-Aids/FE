import "./ChatModal.css";
import CloseButton from "../../../assets/close_chat_modal_icon.svg";
import HistoryIcon from "../../../assets/history_icon.svg";
import SmallChat from "./SmallChat";

export default function ChatModal({ isModalOpen, onClose }) {
  return (
    <div>
      {isModalOpen && (
        <>
          <div className="blur__container" onClick={onClose}>
            <div className="base__container">
              <div className="close__modal__container">
                <img className="close__modal__btn" src={CloseButton} />
              </div>
              <div className="modal__header">
                <img className="close__modal__btn" src={HistoryIcon} />
                Q&A 기록
              </div>
              <SmallChat />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

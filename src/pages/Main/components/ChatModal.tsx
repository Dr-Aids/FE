import "./ChatModal.css";

export default function ChatModal({ isModalOpen, onClose }) {
  return (
    <div>
      {isModalOpen && (
        <>
          <div className="blur__container" onClick={onClose}>
            <div className="base__container">
              <h1>My First Modal</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

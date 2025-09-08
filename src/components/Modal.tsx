import type { ReactNode } from "react";
import "./Modal.css";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {title}
          </span>
          <X style={{ cursor: "pointer" }} size={20} onClick={onClose} />
        </span>
        {children}
      </div>
    </div>
  );
}

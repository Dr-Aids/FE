import { Trash2 } from "lucide-react";
import "./TrashButton.css";

export default function TrashButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="trash__button" onClick={onClick}>
      <Trash2 size={20} />
    </button>
  );
}

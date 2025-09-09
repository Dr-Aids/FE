import { Plus } from "lucide-react";
import "./PlusButton.css";

export default function PlusButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="plus__button" type="button" onClick={onClick}>
      <Plus size={20} />
    </button>
  );
}

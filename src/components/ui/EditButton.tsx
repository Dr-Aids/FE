import { Edit } from "lucide-react";
import "./EditButton.css";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="edit__button" type="button" onClick={onClick}>
      <Edit size={20} />
    </button>
  );
}

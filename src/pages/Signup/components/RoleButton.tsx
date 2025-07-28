import "./RoleButton.css";
export default function RoleButton({ role, isSelcetd, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={isSelcetd ? "role__btn__selected" : "role__btn"}
    >
      {role}
    </button>
  );
}

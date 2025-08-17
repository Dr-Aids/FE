import "./RoleButton.css";

type RoleButtonProp = {
  role: "Doctor" | "Nurse";
  isSelected: boolean;
  onClick: () => void;
};
export default function RoleButton({
  role,
  isSelected,
  onClick,
}: RoleButtonProp) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={isSelected ? "role__btn__selected" : "role__btn"}
    >
      {role}
    </button>
  );
}

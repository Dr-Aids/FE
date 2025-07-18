import HamburgerIcon from "../../assets/hamburger_icon.svg";
import "./HamburgerButton.css";

export default function HamburgerButton() {
  return (
    <button className="hamburger__button">
      <img src={HamburgerIcon} alt="메뉴 아이콘" />
    </button>
  );
}

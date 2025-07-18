import "./SectionHeader.css";
import HamburgerButton from "./ui/HamburgerButton";

export default function SectionHeader({ title }) {
  return (
    <div className="header__container">
      <div className="page__name">{title}</div>
      <HamburgerButton />
    </div>
  );
}

import "./Sidebar.css";
import MainLogo from "../assets/login-logo.png";
import { useNavigate } from "react-router-dom";

function Profile({ name }) {
  return (
    <div className="profile__container">
      <div className="profile__image">👨‍⚕️</div>
      <b>Dr. {name}</b>
    </div>
  );
}

function MenuContent({ content, address }) {
  const nav = useNavigate();
  return (
    <h3 className="menu__item" onClick={() => nav(address)}>
      {content}
    </h3>
  );
}

function Menu() {
  return (
    <div className="menu__container">
      <MenuContent content="메인" address="/main" />
      <MenuContent content="환자" address="/patient/p001/1" />
      <MenuContent content="예측처방" address="/prescription/p001/1" />
      <MenuContent content="특이사항" address="/remark" />
      <MenuContent content="설정" address="/settings" />
    </div>
  );
}

export default function Sidebar({ username }) {
  return (
    <div className="sidebar__container">
      <img className="sidebar__mainlogo" src={MainLogo} />
      <Profile name={username} />
      <Menu />
    </div>
  );
}

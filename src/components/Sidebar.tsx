import "./Sidebar.css";
import MainLogo from "../assets/login-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  Home,
  Users,
  Pill,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    title: "메인",
    icon: Home,
    url: "main",
    isActive: true,
  },
  {
    title: "환자",
    icon: Users,
    url: "patient/p001/1",
    isActive: false,
  },
  {
    title: "예측처방",
    icon: Pill,
    url: "prescription/p001/1",
    isActive: false,
  },
  {
    title: "특이사항",
    icon: AlertTriangle,
    url: "remark",
    isActive: false,
  },
  {
    title: "설정",
    icon: Settings,
    url: "settings",
    isActive: false,
  },
];

function Menu() {
  const nav = useNavigate();
  const location = useLocation();
  const nowUrl = location.pathname.split("/")[1];

  return (
    <div className="menu__container">
      {navigation.map((item) => (
        <div
          className={
            item.url.split("/")[0] === nowUrl
              ? `menu__item__container__selected`
              : `menu__item__container`
          }
          onClick={() => nav(item.url)}
        >
          <item.icon size={20} />
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({ username }) {
  return (
    <div className="sidebar__container">
      <img className="sidebar__mainlogo" src={MainLogo} />
      <div className="profile__container">
        <div className="profile__image">👨‍⚕️</div>
        <b>Dr. {username}</b>
      </div>
      <Menu />
    </div>
  );
}

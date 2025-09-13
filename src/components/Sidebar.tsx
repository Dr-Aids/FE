import "./Sidebar.css";
import MainLogo from "../assets/login-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Pill,
  AlertTriangle,
  Settings,
  Stethoscope,
  Syringe,
} from "lucide-react";

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
    url: "patient",
    isActive: false,
  },
  {
    title: "예측처방",
    icon: Pill,
    url: "prescription",
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
          key={`sidebar-${item.title}`}
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

export default function Sidebar({
  username,
  role = "DOCTOR",
}: {
  username: string;
  role: "DOCTOR" | "NURSE";
}) {
  const nav = useNavigate();

  const Icon = role === "DOCTOR" ? Stethoscope : Syringe;
  const Color =
    role === "DOCTOR"
      ? "oklch(77.7% 0.152 181.912)"
      : "oklch(80.8% 0.114 19.571)";
  return (
    <div className="sidebar__container">
      <img
        className="sidebar__mainlogo"
        src={MainLogo}
        onClick={() => nav("/main")}
      />
      <div className="profile__container">
        <div className="profile__image">
          <Icon className="setting__profile__icon" size={25} color={Color} />
        </div>
        <h3>{username}</h3>
      </div>
      <Menu />
    </div>
  );
}

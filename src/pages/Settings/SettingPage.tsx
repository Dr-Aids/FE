import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/ui/Button";
import type { userData } from "../../types/userData";
import ProfileRow from "./components/ProfileRow";
import "./SettingPage.css";
import { LogOut } from "lucide-react";

export default function SettingPage({
  username,
  email,
  password,
  role,
  hospital,
}: userData) {
  const icon = role === "Doctor" ? "👨‍⚕️" : "👩‍⚕️";
  return (
    <div className="setting-page__container">
      <SectionHeader title={"설정"} />
      <hr />
      <div className="setting__profile__container">
        <div className="setting__profile__icon">{icon}</div>
        <div className="setting__username">{username}님</div>
        <div className="setting__user__info__container">
          <div>
            <ProfileRow title={"직책"} content={role} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"소속 병원"} content={hospital} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"이메일"} content={email} />
          </div>
          <hr />
          <div className="setting__logout">
            <LogOut size={20} />
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

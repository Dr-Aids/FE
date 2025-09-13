import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import SectionHeader from "../../components/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import type { User } from "../../types/userData";
import ProfileInput from "./components/ProfileInput";
import ProfileRow from "./components/ProfileRow";
import "./SettingPage.css";
import { Edit, LogOut, Stethoscope, Syringe } from "lucide-react";

export default function SettingPage() {
  const { user, logout } = useAuth();
  const [displayUser, setDisplayUser] = useState<User>(user);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);

  useEffect(() => {
    setDisplayUser(user);
  }, [user]);

  const Icon = displayUser?.role === "DOCTOR" ? Stethoscope : Syringe;
  const Color =
    displayUser?.role === "DOCTOR"
      ? "oklch(77.7% 0.152 181.912)"
      : "oklch(80.8% 0.114 19.571)";
  return (
    <div className="setting-page__container">
      <SectionHeader title={"설정"} />
      <hr />
      <div className="setting__profile__container">
        <Icon className="setting__profile__icon" size={150} color={Color} />
        <div className="setting__username">{displayUser?.username}님</div>
        <div className="setting__user__info__container">
          <div>
            <ProfileRow title={"직책"} content={displayUser?.role ?? ""} />
          </div>
          <hr />
          <div>
            <ProfileRow
              title={"소속 병원"}
              content={displayUser?.hospitalName ?? ""}
            />
          </div>
          <hr />
          <div>
            <ProfileRow title={"이메일"} content={displayUser?.email ?? ""} />
          </div>
          <hr />
          <div className="setting__buttons">
            <div className="setting__logout" onClick={logout}>
              <LogOut size={20} />
              로그아웃
            </div>
            <div
              className="setting__edit"
              onClick={() => setOpenProfileModal(true)}
            >
              <Edit size={20} />
              수정하기
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="회원 정보 수정"
        isOpen={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
      >
        <ProfileInput
          user={displayUser}
          onClose={() => setOpenProfileModal(false)}
        />
      </Modal>
    </div>
  );
}

import { useState } from "react";
import Modal from "../../components/Modal";
import SectionHeader from "../../components/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import ProfileInput from "./components/ProfileInput";
import ProfileRow from "./components/ProfileRow";
import "./SettingPage.css";
import { Edit, LogOut } from "lucide-react";

export default function SettingPage() {
  const { user, logout } = useAuth();
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const icon =
    user?.role === "DOCTOR" ? "👨‍⚕️" : user?.role === "NURSE" ? "👩‍⚕️" : "";
  return (
    <div className="setting-page__container">
      <SectionHeader title={"설정"} />
      <hr />
      <div className="setting__profile__container">
        <div className="setting__profile__icon">{icon}</div>
        <div className="setting__username">{user?.username}님</div>
        <div className="setting__user__info__container">
          <div>
            <ProfileRow title={"직책"} content={user?.role} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"소속 병원"} content={user?.hospitalName} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"이메일"} content={user?.email} />
          </div>
          <hr />
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

      <Modal
        title="회원 정보 수정"
        isOpen={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
      >
        <ProfileInput user={user} onClose={() => setOpenProfileModal(false)} />
      </Modal>
    </div>
  );
}

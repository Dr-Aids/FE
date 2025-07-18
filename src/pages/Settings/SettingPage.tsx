import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/ui/Button";
import ProfileRow from "./components/ProfileRow";
import "./SettingPage.css";

export default function SettingPage() {
  return (
    <div className="setting-page__container">
      <SectionHeader title={"설정"} />
      <hr />
      <div className="setting__profile__container">
        <img
          className="setting__profile__img"
          src="https://i.imgur.com/yXOvdOSs.jpg"
        />
        <div className="setting__username">username님</div>
        <div className="setting__user__info__container">
          <div>
            <ProfileRow title={"Role"} content={"Doctor"} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"Hospital"} content={"서울 최고 세종 병원"} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"Email"} content={"kang@email.com"} />
          </div>
          <hr />
          <div>
            <ProfileRow
              title={"Logout"}
              content={<Button content={"수정"} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

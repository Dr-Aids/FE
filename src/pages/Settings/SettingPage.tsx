import SectionHeader from "../../components/SectionHeader";
import Button from "../../components/ui/Button";
import type { userData } from "../../types/userData";
import ProfileRow from "./components/ProfileRow";
import "./SettingPage.css";

export default function SettingPage({
  username,
  email,
  password,
  role,
  hospital,
}: userData) {
  console.log(username, email, password, role, hospital);
  return (
    <div className="setting-page__container">
      <SectionHeader title={"설정"} />
      <hr />
      <div className="setting__profile__container">
        <img
          className="setting__profile__img"
          src="https://i.imgur.com/yXOvdOSs.jpg"
        />
        <div className="setting__username">{username}님</div>
        <div className="setting__user__info__container">
          <div>
            <ProfileRow title={"Role"} content={role} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"Hospital"} content={hospital} />
          </div>
          <hr />
          <div>
            <ProfileRow title={"Email"} content={email} />
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

import Button from "../../components/ui/LoginButton";
import "./SignupPage.css";
import LoginLogo from "../../assets/login-logo.png";
import RoleButton from "./components/RoleButton";
import { useState } from "react";

export default function SignupPage() {
  const [isDoctor, setIsDoctor] = useState(true);
  const handleClickDoctorButton = () => {
    if (!isDoctor) {
      // 이미 Doctor일 때 Doctor를 한 번 더 클릭하면 불필요한 렌더링 되는거 방지
      setIsDoctor(true);
    }
  };
  const handleClickNurseButton = () => {
    if (isDoctor) {
      // 이미 Nurse 선택일 때 한 번 더 클릭하면 불필요한 렌더링 되는거 방지
      setIsDoctor(false);
    }
  };

  return (
    <div className="signup__container">
      <header className="signup__header">
        <h1>Ask.Hear.Decide.With Dr.Aids.</h1>
      </header>

      <main className="signup__main">
        <img src={LoginLogo} alt="Logo" />
        <form className="signup__form">
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="role__container">
            Role
            <div className="role__btn__container">
              <RoleButton
                role={"Doctor"}
                isSelcetd={isDoctor}
                onClick={handleClickDoctorButton}
              />
              <RoleButton
                role={"Nurse"}
                isSelcetd={!isDoctor}
                onClick={handleClickNurseButton}
              />
            </div>
          </div>

          <input placeholder="Name" />
          <select className="signup__selcet__container">
            <option>Hospital</option>
            <option>희승병원</option>
            <option>서울병원</option>
            <option>세종병원</option>
          </select>
          <Button children={"Sign Up"} />
        </form>
      </main>
    </div>
  );
}

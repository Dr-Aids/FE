import "./LoginPage.css";
import Button from "../../components/ui/LoginButton";
import LoginLogo from "../../assets/login-logo.png";
import { useNavigate } from "react-router-dom";
import { userData } from "../../mocks/userData";
import { useState } from "react";

export default function LoginPage() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  function handleInputId(e) {
    setId(e.target.value);
  }
  const handleInputPw = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nowUser = undefined; // 로그인 시도하려는 사람
    nowUser = userData.find((user) => user.email === id);
    if (!nowUser) {
      // 입력한 id가 DB에 존재하지 않을 때
      alert("id를 확인해주세요!");
    } else {
      if (nowUser.password === pw) {
        nav("/main");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <div className="login__container">
      <header className="login__header">
        <h1>Ask.Hear.Decide.With Dr.Aids.</h1>
      </header>

      <main className="login__main">
        <img src={LoginLogo} alt="Logo" />
        <form className="login__form" onSubmit={handleSubmit}>
          <input placeholder="Email" value={id} onChange={handleInputId} />
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={handleInputPw}
          />
          <Button>Login</Button>
        </form>
        <section className="login__signup" onClick={() => nav(`/signup`)}>
          Sign up
        </section>
      </main>
    </div>
  );
}

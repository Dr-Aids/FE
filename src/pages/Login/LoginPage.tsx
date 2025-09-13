import "./LoginPage.css";
import Button from "../../components/ui/LoginButton";
import LoginLogo from "../../assets/login-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { login } = useAuth();

  if (localStorage.getItem("accessToken")) nav("/main");

  function handleInputId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }
  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(id, pw);
    } catch (err) {
      alert(err);
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

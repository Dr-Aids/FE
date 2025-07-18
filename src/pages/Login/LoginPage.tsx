import "./LoginPage.css";
import Button from "../../components/ui/LoginButton";
import LoginLogo from "../../assets/login-logo.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  function handleClickLogin() {
    nav(`/main`);
  }
  return (
    <div className="login__container">
      <header className="login__header">
        <h1>Ask.Hear.Decide.With Dr.Aids.</h1>
      </header>

      <main className="login__main">
        <img src={LoginLogo} alt="Logo" />
        <form className="login__form">
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Button onClick={handleClickLogin}>Login</Button>
        </form>
        <section className="login__signup" onClick={() => nav(`/signup`)}>
          Sign up
        </section>
      </main>
    </div>
  );
}

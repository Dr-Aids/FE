import "./LoginButton.css";

export default function LoginButton({ onClick, children }) {
  return (
    <button className="login__button" onClick={onClick}>
      {children}
    </button>
  );
}

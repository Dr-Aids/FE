import "./LoginButton.css";

export default function Button({ onClick, children }) {
  return (
    <button className="login__button" onClick={onClick}>
      {children}
    </button>
  );
}

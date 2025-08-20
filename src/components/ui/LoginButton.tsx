import "./LoginButton.css";

export default function LoginButton({ children }: { children: string }) {
  return (
    <button type="submit" className="login__button">
      {children}
    </button>
  );
}

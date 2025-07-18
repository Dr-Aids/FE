import "./Button.css";
export default function Button({ content, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {content}
    </button>
  );
}

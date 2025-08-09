import "./ContentBox.css";
export default function ContentBox({ title, content }) {
  return (
    <div className="content__box__container">
      <b>{title}</b>
      <b>{content}</b>
    </div>
  );
}

import "./ContentBox.css";
export default function ContentBox({ title, content }) {
  return (
    <div className="content__box__container">
      {title}
      {content}
    </div>
  );
}

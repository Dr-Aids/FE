import "./ContentBox.css";
export default function ContentBox({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="content__box__container">
      <h3>{title}</h3>
      <h4>{content}</h4>
    </div>
  );
}

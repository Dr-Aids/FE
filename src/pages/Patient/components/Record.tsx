import Button from "../../../components/Button";
import "./Record.css";

export default function Record({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  return (
    <div className="record__container">
      <div className="record__header">
        <div className="record__title">
          {role === "nurse" ? "Nurse Records" : "Doctor Orders"}
        </div>
        <div className="record__buttons">
          <Button content={"삭제"} />
          <Button content={"수정"} />
        </div>
      </div>
      <div className="record__content">{content}</div>
    </div>
  );
}

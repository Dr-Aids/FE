import Button from "../../../components/ui/Button";
import "./Record.css";

export default function Record() {
  return (
    <div className="record__container">
      <div className="record__header">
        <div className="record__title">Records</div>
        <div className="record__buttons">
          <Button content={"삭제"} />
          <Button content={"수정"} />
        </div>
      </div>
      <div className="record__content"></div>
    </div>
  );
}

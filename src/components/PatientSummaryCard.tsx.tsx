import Button from "./ui/Button";
import "./PatientSummaryCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import type { Patient } from "../types/patientSummaryType";

export default function PatientSummaryCard({
  id,
  name,
  age,
  birth,
  gender,
  disease,
  rounds,
}: Patient) {
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  function handleChangeOption(e) {
    const address = e.target.value;
    nav(`/${pageName}/${address}`);
  }
  return (
    <div className="patient__info__container">
      <div className="patient__info__main">
        <div className="patient__info__info">
          <div className="patient__info__name">{name}</div>
          <div className="patient__info__sex">{gender}</div>|
          <div>
            {age}세 / {birth}
          </div>
          |<div>{disease}</div>
          <div className="patient__info__buttons">
            <Button content={"삭제"} onClick={() => alert("삭제버튼 누름")} />
            <Button content={"수정"} onClick={() => alert("수정버튼 누름")} />
          </div>
        </div>
        <form>
          <select
            className="patient__info__dropdown"
            onChange={handleChangeOption}
          >
            {rounds ? (
              rounds.map((round) => (
                <option
                  key={id + "/" + round.round}
                  value={id + "/" + round.round}
                >
                  {round.round}회차 / {round.date}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </form>
      </div>
    </div>
  );
}

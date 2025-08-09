import Button from "./ui/Button";
import "./PatientSummaryCard.css";
import SectionHeader from "./SectionHeader";
import { useLocation, useNavigate } from "react-router-dom";

export default function PatientSummaryCard({
  id = "",
  name = "",
  age = 0,
  birth = "",
  gender = "",
  disease = "",
  rounds,
}) {
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  function handleChangeOption(e) {
    const address = e.target.value;
    nav(`/${pageName}/${address}`);
  }
  return (
    <>
      <div className="patient__info__container">
        <SectionHeader title={pageName} />
        <div className="patient__info__main">
          <div className="patient__info__info">
            <div className="patient__info__name">{name}</div>
            <div className="patient__info__sex">{gender}</div>|
            <div>
              {age}세 / {birth}
            </div>
            |<div>{disease}</div>
            <div className="patient__info__buttons">
              <Button content={"삭제"} onClick={() => alert("굿")} />
              <Button content={"수정"} onClick={() => alert("굿")} />
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
      <hr className="patient-summary-card__hr" />
    </>
  );
}

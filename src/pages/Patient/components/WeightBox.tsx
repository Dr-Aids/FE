import "./WeightBox.css";

export default function WeightBox({ title, weight }) {
  return (
    <div className="weight__box__container">
      <div>{title}</div>
      <b>{weight} kg</b>
    </div>
  );
}

import "./WeightBox.css";

export default function WeightBox({
  title,
  weight,
}: {
  title: string;
  weight: number | null;
}) {
  return (
    <div className="weight__box__container">
      <div>{title}</div>
      <h4>{weight ? weight.toFixed(1) : "-"} kg</h4>
    </div>
  );
}

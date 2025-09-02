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
      <b>{weight ? weight : "-"} kg</b>
    </div>
  );
}

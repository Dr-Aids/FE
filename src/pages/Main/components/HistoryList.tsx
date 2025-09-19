import "./HistoryList.css";
import HistoryRow from "./HistoryRow";

export default function HistoryList({
  onRowClick,
}: {
  onRowClick: () => void;
}) {
  return (
    <div className="historylist__container">
      <HistoryRow onRowClick={onRowClick} />
      <HistoryRow onRowClick={onRowClick} />
      <HistoryRow onRowClick={onRowClick} />
      <HistoryRow onRowClick={onRowClick} />
      <HistoryRow onRowClick={onRowClick} />
      <HistoryRow onRowClick={onRowClick} />
    </div>
  );
}

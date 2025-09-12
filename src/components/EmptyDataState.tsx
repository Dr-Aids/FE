import {
  Weight,
  Plus,
  CalendarPlus2,
  NotepadText,
  AlertTriangleIcon,
  Users,
} from "lucide-react";
import "./EmptyDataState.css";

type EmptyDataType = "weight" | "bp" | "bpnote" | "specialNote" | "user";

interface EmptyDataStateProps {
  type: EmptyDataType;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyDataState({
  type,
  title,
  description,
  actionText,
  onAction,
}: EmptyDataStateProps) {
  const iconMap = {
    weight: Weight,
    bp: CalendarPlus2,
    bpnote: NotepadText,
    specialNote: AlertTriangleIcon,
    user: Users,
  };

  const colorMap = {
    weight: "oklch(62.3% 0.214 259.815)",
    bp: "oklch(63.7% 0.237 25.331)",
    bpnote: "oklch(60.6% 0.25 292.717)",
    specialNote: "oklch(79.5% 0.184 86.047)",
    user: "oklch(72.3% 0.219 149.579)",
  };

  const Icon = iconMap[type];
  const Color = colorMap[type];

  return (
    <div className="emptydata-container">
      {/* 아이콘 */}
      <div className="icon-wrapper">
        <div className="icon-circle">
          <Icon className="icon" color={Color} />
        </div>
      </div>

      {/* 제목 */}
      <h3 className="emptydata-title">{title}</h3>

      {/* 설명 */}
      <p className="emptydata-description">{description}</p>

      {/* 액션 버튼 */}
      {actionText && (
        <button className="emptydata-button" onClick={onAction}>
          <Plus className="button-icon" />
          {actionText}
        </button>
      )}
    </div>
  );
}

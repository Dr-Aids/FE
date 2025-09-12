import type { ReactNode } from "react";
import "./ProfileRow.css";
import { Mail, Building2, UserCheck } from "lucide-react";

export default function ProfileRow({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  let icon: ReactNode = null;
  let bg = null;
  if (title === "직책") {
    icon = <UserCheck size={25} color="oklch(54.6% 0.245 262.881)" />;
    bg = "oklch(93.2% 0.032 255.585)";
  } else if (title === "소속 병원") {
    icon = <Building2 size={25} color="oklch(62.7% 0.194 149.214)" />;
    bg = "oklch(96.2% 0.044 156.743)";
  } else {
    icon = <Mail size={25} color="oklch(55.8% 0.288 302.321)" />;
    bg = "oklch(94.6% 0.033 307.174)";
  }
  return (
    <div className="profile-row__container">
      <span
        className="profile__icon__container"
        style={{ backgroundColor: bg }}
      >
        {icon}
      </span>
      <h3 className="profile-row-title">{title}</h3>
      <h3>{content}</h3>
    </div>
  );
}

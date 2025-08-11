import type { ReactNode } from "react";
import "./SectionHeader.css";
import HamburgerButton from "./ui/HamburgerButton";
// 나중에 햄버거 버튼 쓸일 있으면 그때 넣자

export default function SectionHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  function changePageNameToKR(pagename) {
    if (pagename === "patient") return "환자 정보";
    else if (pagename === "prescription") return "예측 처방";
    else if (pagename === "remark") return "특이사항";
    else return pagename;
  }
  return (
    <div className="header__container">
      <div className="page__name">{changePageNameToKR(title)}</div>
      {children ? <div>{children}</div> : null}
      {title === "Patients" ? null : <hr className="header__hr" />}
    </div>
  );
}

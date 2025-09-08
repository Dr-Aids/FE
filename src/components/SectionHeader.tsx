import { useState, type ReactNode } from "react";
import "./SectionHeader.css";
import Button from "./ui/Button";
import Modal from "./Modal";
import PatientInfoInput from "./PatientInfoInput";

export default function SectionHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  const [openPatientAdd, setOpenPatientAdd] = useState<boolean>(false);

  function changePageNameToKR(pagename: string) {
    if (pagename === "patient") return "환자 정보";
    else if (pagename === "prescription") return "예측 처방";
    else if (pagename === "remark") return "특이사항";
    else return pagename;
  }
  return (
    <div className="header__container">
      <div className="page__name">
        {changePageNameToKR(title)}
        {title === "Patients" ? (
          <Button
            content={"추가"}
            onClick={() => setOpenPatientAdd(true)}
          ></Button>
        ) : (
          ""
        )}
      </div>
      {children ? <div>{children}</div> : null}
      {title === "Patients" ? null : <hr className="header__hr" />}

      <Modal
        title="환자 정보 수정"
        isOpen={openPatientAdd}
        onClose={() => setOpenPatientAdd(false)}
      >
        <PatientInfoInput onClose={() => setOpenPatientAdd(false)} />
      </Modal>
    </div>
  );
}

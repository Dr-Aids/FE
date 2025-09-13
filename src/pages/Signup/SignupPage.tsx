import Button from "../../components/ui/LoginButton";
import "./SignupPage.css";
import LoginLogo from "../../assets/login-logo.png";
import RoleButton from "./components/RoleButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import HospitalInput from "./components/HospitalInput";

interface FormErrors {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
  hospital?: string;
}

interface FormData {
  email?: string;
  password?: string;
  role?: string;
  name?: string;
  hospital?: string;
}

interface Hospitals {
  id: string;
  hospitalName: string;
}

export default function SignupPage() {
  const [hospitalList, setHospitalList] = useState<Hospitals[]>([]);
  const [openHospitalModal, setOpenHospitalModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
    name: "",
    hospital: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const nav = useNavigate();

  const fetchHospitals = async () => {
    try {
      const res = await fetch("api/hospital/list");
      if (!res.ok) throw new Error(`HTTP ERROR - ${res.status}`);
      const data = await res.json();
      setHospitalList(data);
    } catch (err) {
      console.log("에러(병원 목록 조회) :", err);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const checkField = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }
    if (!formData.role) {
      newErrors.role = "역할을 선택해주세요";
    }
    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.hospital) {
      newErrors.hospital = "병원을 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkField()) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.name,
            password: formData.password,
            email: formData.email,
            role: formData.role,
            hospitalname: formData.hospital,
          }),
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status} - ${text}`);
        }
        const data = await response.json();
        console.log("요청 성공 : ", data);

        alert("회원가입 성공!");
        nav("/");
      } catch (error) {
        console.error("API 요청 에러:", error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="signup__container">
      <header className="signup__header">
        <h1>Ask.Hear.Decide.With Dr.Aids.</h1>
      </header>

      <main className="signup__main">
        <img src={LoginLogo} alt="Logo" />

        <form className="signup__form" onSubmit={handleSubmit}>
          {/*이메일*/}
          <div className="email__container">
            <p>이메일</p>
            <input
              placeholder="Email"
              value={formData.email}
              autoComplete="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              style={{ border: errors.email ? "1px solid red" : "" }}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          {/*비밀번호*/}
          <div className="password__container">
            <p>비밀번호</p>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              style={{ border: errors.password ? "1px solid red" : "" }}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          {/*역할 선택*/}
          <div className="role__container">
            역할
            <div className="role__btn__container">
              <RoleButton
                role={"Doctor"}
                isSelected={formData.role === "DOCTOR"}
                onClick={() => handleInputChange("role", "DOCTOR")}
              />
              <RoleButton
                role={"Nurse"}
                isSelected={formData.role === "NURSE"}
                onClick={() => handleInputChange("role", "NURSE")}
              />
            </div>
            {errors.role && <span>{errors.role}</span>}
          </div>

          {/*이름*/}
          <div className="name__container">
            <p>이름</p>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              style={{ border: errors.name ? "1px solid red" : "" }}
            />

            {errors.name && <span>{errors.name}</span>}
          </div>

          {/*병원*/}
          <div className="select__container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>병원</div>
              <div
                style={{
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setOpenHospitalModal(true)}
              >
                병원 추가
              </div>
            </div>
            <select
              className="signup__selcet"
              value={formData.hospital}
              onChange={(e) => handleInputChange("hospital", e.target.value)}
            >
              <option value="" disabled hidden>
                병원 선택
              </option>
              {hospitalList.map((item) => (
                <option key={`SignUp-Hospital-${item.id}`}>
                  {item.hospitalName}
                </option>
              ))}
            </select>
            {errors.hospital && <span>{errors.hospital}</span>}
          </div>
          <Button children={"Sign Up"} />
        </form>
      </main>

      <Modal
        title="병원 등록"
        isOpen={openHospitalModal}
        onClose={() => setOpenHospitalModal(false)}
      >
        <HospitalInput
          onClose={() => setOpenHospitalModal(false)}
          onHospitalAdded={fetchHospitals}
        />
      </Modal>
    </div>
  );
}

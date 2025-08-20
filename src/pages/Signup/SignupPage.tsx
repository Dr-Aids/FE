import Button from "../../components/ui/LoginButton";
import "./SignupPage.css";
import LoginLogo from "../../assets/login-logo.png";
import RoleButton from "./components/RoleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const hospitalList = ["희승병원", "세종병원", "서울병원"];

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
    name: "",
    hospital: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const nav = useNavigate();

  const handleInputChage = (field: keyof FormData, value: string) => {
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

  const handleSubmit = (e) => {
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
              onChange={(e) => handleInputChage("email", e.target.value)}
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
              onChange={(e) => handleInputChage("password", e.target.value)}
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
                onClick={() => handleInputChage("role", "DOCTOR")}
              />
              <RoleButton
                role={"Nurse"}
                isSelected={formData.role === "NURSE"}
                onClick={() => handleInputChage("role", "NURSE")}
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
              onChange={(e) => handleInputChage("name", e.target.value)}
              style={{ border: errors.name ? "1px solid red" : "" }}
            />

            {errors.name && <span>{errors.name}</span>}
          </div>

          {/*병원*/}
          <div className="select__container">
            <p>병원</p>
            <select
              className="signup__selcet"
              value={formData.hospital}
              onChange={(e) => handleInputChage("hospital", e.target.value)}
            >
              <option selected disabled hidden>
                Hospital
              </option>
              {hospitalList.map((item) => (
                <option key={`SignUp-Hospital-${item}`}>{item}</option>
              ))}
            </select>
            {errors.hospital && <span>{errors.hospital}</span>}
          </div>
          <Button children={"Sign Up"} />
        </form>
      </main>
    </div>
  );
}

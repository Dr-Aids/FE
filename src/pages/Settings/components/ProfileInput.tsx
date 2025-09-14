import React, { useState } from "react";
import "./ProfileInput.css";
import type { User } from "../../../types/userData";

interface ProfileInputProsp {
  onClose: () => void;
  user: User;
}

interface ProfileFormErrors {
  username?: string;
  role?: string;
}
export default function ProfileInput({ onClose, user }: ProfileInputProsp) {
  const [formData, setFormData] = useState<User>(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<ProfileFormErrors>({});

  const checkField = () => {
    const newErrors: ProfileFormErrors = {};
    if (!formData!.username) {
      newErrors.username = "이름을 입력해주세요";
    }

    if (!formData!.role) {
      newErrors.role = "역할을 선택해주세요";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // checkFiled의 반환이 true여야 데이터가 정상 입력된 상태
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => {
      if (prev === null) {
        return null;
      }
      return {
        ...prev,
        username: value,
      };
    });
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "DOCTOR" | "NURSE";
    setFormData((prev) => {
      if (prev === null) {
        return null;
      }
      return {
        ...prev,
        role: value,
      };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!checkField()) return;

    const accessToken = localStorage.getItem("accessToken");

    setIsLoading(true);
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username: formData?.username,
          role: formData?.role,
        }),
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      onClose();
      window.location.reload();
    } catch (err) {
      console.log("에러메세지(회원정보 수정) : ", err);
      alert("정보 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="profile-input-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="username">이름</label>
        <div className="form-input-col">
          <input
            type="text"
            id="username"
            value={formData?.username}
            placeholder="홍길동"
            onChange={handleInput}
          />
          {formErrors.username && <span>{formErrors.username}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="role">역할</label>
        <div className="form-input-col">
          <select
            id="role"
            onChange={handleChangeOption}
            defaultValue={formData?.role}
            value={formData?.role}
          >
            <option value={"DOCTOR"}>DOCTOR</option>
            <option value={"NURSE"}>NURSE</option>
          </select>
          {formErrors.role && <span>{formErrors.role}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "수정 중..." : "수정"}
        </button>
      </div>
    </form>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/userData";
import { useNavigate } from "react-router-dom";

const AuthCtx = createContext<{
  user: User;
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>({ user: null, isLogin: false, login: async () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [access, setAccess] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const nav = useNavigate();
  useEffect(() => {
    if (!access) return; // 액세스 토큰 없다면 로그인 유효기간 끝
    // 기존 액세스 토큰으로 계속 요청 보내서 받아옴
    (async () => {
      let res = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${access}` },
      });
      //   if (res.status === 401) {
      //     // refresh 쿠키 기반 재발급
      //     const r = await fetch("/api/auth/refresh", {
      //       method: "POST",
      //       credentials: "include",
      //     });
      //     const next = r.headers.get("access");
      //     if (r.ok && next) {
      //       setAccess(next);
      //       localStorage.setItem("accessToken", next);
      //       res = await fetch("/api/user", {
      //         headers: { Authorization: `Bearer ${next}` },
      //       });
      //     }
      //   }
      if (res.ok) setUser(await res.json());
    })();
  }, [access]);

  // 로그인 로직
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include", // 쿠키 기반이면 필요
      });

      // 액세스 토큰 제대로 받았을 때만 메인화면으로
      const accessToken = res.headers.get("access");
      if (accessToken) {
        setAccess(accessToken);
        localStorage.setItem("accessToken", accessToken);
      }

      if (!res.ok) {
        throw res.status;
      }

      const me = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${accessToken ?? access}` },
      });
      if (me.ok) setUser(await me.json());
    } catch (error) {
      console.log(error);
      if (error === 401) alert("아이디 또는 비밀번호를 확인해주세요");
    }
  };

  // 로그아웃 로직
  const logout = () => {
    setUser(null);
    setAccess(null);
    localStorage.removeItem("accessToken");
    nav("/");
  };

  return (
    <AuthCtx.Provider value={{ user, isLogin: !!user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx); // 커스텀 훅?

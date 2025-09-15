import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/userData";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

type AuthContextValue = {
  user: User | null; // ← nullable
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void> | void;
};

const AuthCtx = createContext<AuthContextValue>({
  user: null,
  isLogin: false,
  login: async () => {},
  logout: () => {},
});

// 응답에서 accessToken을 헤더(or JSON)로부터 꺼내기
const getAccessFrom = async (res: Response): Promise<string | null> => {
  const byHeader = res.headers.get("access");
  if (byHeader) return byHeader;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      const data = await res.clone().json();
      if (data?.accessToken) return data.accessToken as string;
    } catch {}
  }
  return null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [access, setAccess] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const nav = useNavigate();

  // 만료 시 새 accessToken 재발급
  const refresh = async (): Promise<string | null> => {
    const r = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // 👈 쿠키 전송 필수
    });
    if (!r.ok) return null;

    const next = await getAccessFrom(r);
    if (!next) return null;

    localStorage.setItem("accessToken", next);
    setAccess(next);
    return next;
  };
  useEffect(() => {
    if (!access) return;

    (async () => {
      // 1) 현재 토큰으로 프로필 조회
      let res = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${access}` },
        credentials: "include",
      });

      // 2) 401이면 refresh 시도 후 재시도
      if (res.status === 401) {
        const next = await refresh();
        if (!next) {
          // 리프레시 실패 → 세션 정리
          setUser(null);
          setAccess(null);
          localStorage.removeItem("accessToken");
          alert("세션이 만료되었습니다.");
          nav("/");
          return;
        }
        res = await fetch(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${next}` },
          credentials: "include",
        });
      }

      // 3) 성공이면 사용자 세팅
      if (res.ok) setUser(await res.json());
    })();
  }, [access]);

  // 로그인 로직
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 👈 refresh 쿠키 받기
      });

      // (1) 실패 먼저 처리
      if (!res.ok) {
        if (res.status === 401) alert("아이디 또는 비밀번호를 확인해주세요");
        else alert("로그인에 실패했습니다.");
        return;
      }

      // (2) accessToken 추출 & 저장
      const next = await getAccessFrom(res);
      if (next) {
        setAccess(next);
        localStorage.setItem("accessToken", next);
      }

      // (3) 내 정보 세팅
      const tokenForReq = next; // 'login' 직후이므로 항상 'next' 토큰을 사용해야 합니다.
      if (!tokenForReq) {
        alert("로그인에 성공했으나 인증 토큰을 받지 못했습니다.");
        return;
      }

      const me = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${tokenForReq}` },
        credentials: "include",
      });

      if (me.ok) {
        setUser(await me.json());
        // (4) 이동
        nav("/main");
      } else {
        alert("사용자 정보를 가져오는 데 실패했습니다. 다시 로그인해주세요.");
        // 토큰은 받았지만 후속 요청이 실패했으므로, 받은 토큰을 무효화 처리합니다.
        setAccess(null);
        localStorage.removeItem("accessToken");
      }
    } catch (e) {
      console.error(e);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // 로그아웃 로직
  const logout = () => {
    setUser(null);
    setAccess(null);
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    nav("/");
  };

  return (
    <AuthCtx.Provider value={{ user, isLogin: !!user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx); // 커스텀 훅?

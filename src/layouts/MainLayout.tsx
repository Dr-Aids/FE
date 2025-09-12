import "./MainLayout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// 사이드바가 포함된 레이아웃

export default function MainLayout() {
  const { user } = useAuth();
  return (
    <div className="main-layout__container">
      <aside className="sidebar-column">
        <Sidebar
          username={user?.username ?? "-"}
          role={user?.role ?? "DOCTOR"}
        />
      </aside>
      <main className="main-layout__page__container">
        <Outlet />
      </main>
    </div>
  );
}

import "./MainLayout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

// 사이드바가 포함된 레이아웃

export default function MainLayout() {
  return (
    <div className="main-layout__container">
      <aside>
        <Sidebar />
      </aside>
      <main className="main-layout__page__container">
        <Outlet />
      </main>
    </div>
  );
}

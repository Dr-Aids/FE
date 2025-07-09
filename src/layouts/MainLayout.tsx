import "./MainLayout.css";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout__container">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

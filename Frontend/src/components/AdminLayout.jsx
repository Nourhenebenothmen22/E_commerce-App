// components/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; 

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "./AdminHome.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const { user } = useUser();

  const menuItems = [
    { title: "Product Catalog", icon: "🛒", link: "/admin-dashboard/products", color: "#355C7D" },
    { title: "Orders Overview", icon: "📦", link: "/admin-dashboard/orders", color: "#F67280" },
    { title: "Insights & Analytics", icon: "📊", link: "/admin-dashboard/analytics", color: "#F8B195" },
  ];

  // Nom de l’admin depuis Clerk
  const adminName = user?.firstName || user?.fullName || "Admin";

  return (
    <div className="admin-home container py-5">
      <h1 className="text-center mb-5">Welcome, {adminName} 👋</h1>
      <p className="text-center text-muted mb-5">Choose a section to manage your store</p>

      <div className="row g-4">
        {menuItems.map((item) => (
          <div key={item.title} className="col-md-6 col-lg-4">
            <div
              className="admin-card text-center p-4 rounded-4 shadow-lg"
              style={{ backgroundColor: item.color }}
              onClick={() => navigate(item.link)}
            >
              <div className="icon fs-1 mb-3">{item.icon}</div>
              <h3 className="card-title fs-5 fw-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

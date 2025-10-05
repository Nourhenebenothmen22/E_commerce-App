// App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout"; // Import du layout

import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
// Importez vos nouveaux composants pour chaque section
import ProductCatalog from "./pages/admin/ProductCatalog";
import OrdersOverview from "./pages/admin/OrdersOverview";
import InsightsAnalytics from "./pages/admin/InsightsAnalytics";
import AdminHome from "./components/AdminHome";
import AddProduct from "./pages/admin/AddProduct ";

export default function App() {
  return (
    <>
      <Routes>
        {/* Route publique */}
        <Route path="/" element={<Home />} />

        {/* Route utilisateur protégée */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Route parente pour tout le dashboard admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Les routes enfants s'afficheront dans l'<Outlet /> de AdminLayout */}
          {/* Une route index est la page par défaut d'un ensemble de routes enfants */}
          <Route index element={<AdminHome/>} />
*          <Route path="products" element={<ProductCatalog />} />
          <Route path="orders" element={<OrdersOverview />} />
          <Route path="analytics" element={<InsightsAnalytics />} />
          <Route path="add-product" element={<AddProduct />} />

          
        </Route>
      </Routes>
    </>
  );
}
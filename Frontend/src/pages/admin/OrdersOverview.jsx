import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersOverview() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost:5000"; // your backend URL

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`);
      // Assure-toi que orders est bien un tableau
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Axios error:", err);
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);


 const filteredOrders = Array.isArray(orders)
  ? orders.filter(
      (order) =>
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="text-center text-danger mt-5">{error}</div>;

  if (orders.length === 0 && !error)
    return (
      <div className="text-center mt-5 text-muted">
        No orders found in the backend.
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Orders</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search orders by user or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#ID</th>
              <th>User</th>
             
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id || order.id}>
                <td>{order._id || order.id}</td>
                <td>{order.user?.name || "—"}</td>
                <td>{order.status}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No matching orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

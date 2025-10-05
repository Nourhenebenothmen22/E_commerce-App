import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function InsightsAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/admin/stats`);
        setStats(res.data.data);
      } catch (err) {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!stats) return null;

  // Construire les cards dynamiquement
  const orderStats = stats.orderStats || {};
  const cards = [
    { title: "Pending Orders", value: orderStats.pending || 0, icon: <FaClock />, bgColor: '#E154B9' },
    { title: "Paid Orders", value: orderStats.paid || 0, icon: <FaCheckCircle />, bgColor: '#E154B9'},
    { title: "Shipped Orders", value: orderStats.shipped || 0, icon: <FaTruck />, bgColor: '#E154B9' },
  ];

  // Data pour Pie chart des utilisateurs
const userData = {
  labels: ['Customers', 'Admins'],
  datasets: [
    {
      label: 'Users',
      data: [stats.userStats.customer, stats.userStats.admin],
      backgroundColor: ['#7323AB', '#E154B9'], // violet moyen + rose violet
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 10
    }
  ]
};

// Data pour Pie chart des catégories
const categoryData = {
  labels: Object.keys(stats.productByCategory),
  datasets: [
    {
      label: 'Products by Category',
      data: Object.values(stats.productByCategory),
      backgroundColor: ['#32004F', '#7323AB', '#E154B9', '#F31365', '#C3122F'], // palette complète
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 10
    }
  ]
};



  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Order Status Overview</h2>

      {/* Cards */}
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card text-white h-100"
              style={{
                backgroundColor: card.bgColor,
                borderRadius: '12px',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{card.icon}</div>
              <h3>{card.value}</h3>
              <p className="mb-0">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow rounded">
            <h5 className="text-center mb-3">User Distribution</h5>
            <Pie data={userData} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow rounded">
            <h5 className="text-center mb-3">Products by Category</h5>
            <Pie data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsAnalytics;

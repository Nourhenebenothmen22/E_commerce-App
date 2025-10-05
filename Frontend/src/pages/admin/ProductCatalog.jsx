import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaDollarSign, FaBoxOpen, FaTags } from "react-icons/fa";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost:5000";

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/products`),
        axios.get(`${BACKEND_URL}/api/categories`),
      ]);
      setProducts(productsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
    } catch (err) {
      console.error("Axios error:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory ||
      product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5 products-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="page-title">Our Products</h2>
        <Link
          to="/admin-dashboard/add-product"
          className="btn btn-add-gradient d-flex align-items-center gap-2"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>

      {/* Categories */}
      <div className="category-filter mb-4">
        <button
          className={`btn ${selectedCategory === "All" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`btn ${selectedCategory === cat.name ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card product-card shadow-sm">
                <div className="image-wrapper">
                  <img
                    src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="product-img"
                  />
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">
                      <FaTags className="me-2 text-purple" />
                      {product.name}
                    </h5>

                    <p className="info-item">
                      <FaDollarSign className="me-2 text-success" /> {product.price} €
                    </p>
                    <p className={`info-item ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                      <FaBoxOpen className="me-2" /> {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                    </p>
                  </div>

                  <div className="mt-3 text-end">
                    <button
                      className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-5 w-100">
            No products match your search or category.
          </div>
        )}
      </div>
    </div>
  );
}

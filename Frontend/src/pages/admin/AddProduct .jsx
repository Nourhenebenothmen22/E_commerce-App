import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import "./AddProduct.css"; // CSS externe pour le style violet dégradé
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data.data || res.data))
      .catch(err => console.error(err));
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      images.forEach(img => formData.append("images", img));

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Produit ajouté avec succès !");
      setName(""); setPrice(""); setStock(""); setCategory("");
      setImages([]); setPreviews([]);
      navigate("/admin-dashboard/products");
    } catch (err) {
      console.error(err);
      alert("❌ Échec de l’ajout du produit !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 add-product-page">
      <div className="card shadow p-4 border-0">
        <h3 className="text-center mb-4 text-gradient">
          <FaPlus className="me-2" /> Add New Product
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control input-gradient"
                placeholder="Enter product name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                className="form-control input-gradient"
                placeholder="Enter product price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control input-gradient"
                placeholder="Enter available stock"
                value={stock}
                onChange={e => setStock(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select input-gradient"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Product Images</label>
              <input
                type="file"
                className="form-control input-gradient"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="col-md-6 d-flex flex-wrap gap-2 align-items-center">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "2px solid #8e2de2",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-gradient px-4 py-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <FaPlus className="me-2" />
              )}
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

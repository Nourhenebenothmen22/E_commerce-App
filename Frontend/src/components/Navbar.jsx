import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "./Navbar.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm sticky-top py-3 ${
        darkMode ? "bg-dark text-light" : "bg-light"
      }`}
    >
      <div className="container-fluid px-4">
        <a className="navbar-brand fw-bold text-primary" href="#">
          <i className="bi bi-bag-check-fill me-2"></i> Luxora
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Toggle Dark/Light */}
            <button
              className="btn btn-outline-secondary"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <i className="bi bi-sun-fill text-light"></i>
              ) : (
                <i className="bi bi-moon-fill text-dark"></i>
              )}
            </button>

            {/* Clerk Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-outline-primary rounded-pill px-3">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Panier */}
            <a href="#" className="position-relative">
              <i
                className={`bi bi-cart3 fs-4 ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              ></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

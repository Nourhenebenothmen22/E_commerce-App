import { useState } from "react";
import { UserButton, SignedOut, SignOutButton } from "@clerk/clerk-react";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg px-4 py-2 admin-navbar ${
        darkMode ? "dark-mode" : "navbar-glow"
      }`}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand logo and title */}
        <a
          className="navbar-brand fw-bold text-white fs-3 d-flex align-items-center"
          href="#"
          style={{ letterSpacing: "1px" }}
        >
          <i className="bi bi-gem me-2 text-warning"></i>
          <span className="brand-text">LuxBoard</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right section */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="adminNavbar"
        >
          <div className="d-flex align-items-center gap-3">
            {/* Dark mode toggle */}
            <button
              className="btn btn-toggle d-flex align-items-center justify-content-center rounded-circle p-2 shadow-sm"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Activate light mode" : "Activate dark mode"
              }
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
            >
              {darkMode ? (
                <i className="bi bi-sun-fill fs-5 text-warning"></i>
              ) : (
                <i className="bi bi-moon-fill fs-5 text-light"></i>
              )}
            </button>

            {/* Clerk UserButton */}
            <div
              className="d-flex align-items-center justify-content-center shadow-sm"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: { width: 36, height: 36 },
                  },
                }}
              />
            </div>

            {/* Logout button */}
            <SignedOut>
              <SignOutButton>
                <button className="btn btn-logout d-flex align-items-center gap-2 shadow-sm">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </SignOutButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

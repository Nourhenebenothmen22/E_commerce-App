// pages/Home.jsx
import AuthRedirector from "../components/AuthRedirector";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import "./Home.css";
import Luxora from '../assets/Luxora.png'; // image importée correctement

function Home() {
  return (
    <div>
      <AuthRedirector />

      <section className="hero full-page">
        <div className="hero-content">
          <h1>Bienvenue chez Luxora</h1>
          <p>Découvrez les meilleurs produits, promotions et nouveautés chaque jour.</p>
          <div className="hero-buttons">
            <SignUpButton>
              <button className="cta-button">Créer un compte</button>
            </SignUpButton>
            <SignInButton>
              <button className="cta-button secondary">Se connecter</button>
            </SignInButton>
          </div>
        </div>
        <div className="hero-image">
          <img src={Luxora} alt="Shopping illustration" />
        </div>
      </section>
    </div>
  );
}

export default Home;

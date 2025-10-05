// pages/Home.jsx
import AuthRedirector from "../components/AuthRedirector";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <AuthRedirector /> {/* This handles the redirection for signed-in users */}
      
    </div>
  );
}

export default Home;
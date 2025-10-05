// components/AuthRedirector.jsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirector() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run the redirection after we know the user's authentication status
    if (isLoaded && isSignedIn) {
      // Check the user's role and navigate accordingly
      if (user.publicMetadata.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard"); 
      }
    }
    // If the user is not signed in, we do nothing. They stay on the Home page.
  }, [isLoaded, isSignedIn, user, navigate]); // Depend on isSignedIn

  return null; // This component doesn't render anything visually
}
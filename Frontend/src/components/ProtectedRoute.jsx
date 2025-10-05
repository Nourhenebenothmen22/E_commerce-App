// components/ProtectedRoute.jsx
import { useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoaded, user } = useUser();

  // Show a loading state while Clerk is initializing
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If user is not signed in, don't render the protected content.
  // The RedirectAdmin component (or similar) will handle the redirection.
  if (!user) {
    return null; // Or a placeholder, but do not redirect here
  }

  // If the route requires admin role and the user is not an admin, do not render.
  if (adminOnly && user.publicMetadata.role !== "admin") {
    return null;
  }

  // If all checks pass, render the protected content
  return children;
}
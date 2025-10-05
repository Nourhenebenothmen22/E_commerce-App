import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function RedirectAdmin() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.publicMetadata.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/"); 
      }
    }
  }, [user, navigate]);

  return null;
}

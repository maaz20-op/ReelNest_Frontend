import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToastContext } from "../../../contexts/toast";

export const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showToast } = useToastContext();

  useEffect(() => {
    const userString = searchParams.get("user");
    console.log(userString);
    if (!userString) {
      setUser(null);
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userString));

      console.log("Google User:", user);
      if (user && user?._id) {
        setUser(user);
        showToast("Google Login Success!", true);
        navigate("/");
        return;
      }

      showToast("Google Login Falied", false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Invalid Google user data:", error);
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-0 w-full bg-(--bg-primary) flex justify-center text-(--text-primary)">
      Logging you in...
    </div>
  );
};

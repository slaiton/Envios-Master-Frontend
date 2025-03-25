import { ReactNode, useEffect } from "react";
import Header from "../presentation/components/Header";
import Footer from "../presentation/components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="w-screen flex flex-col min-h-screen">
      {isAuthenticated && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
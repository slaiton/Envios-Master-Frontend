import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Menu as MenuIcon, X, Home, Box, User, Search, Settings, LogOut } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import { logout as authLogout } from "../../services/authService"; // Importamos authService


const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    authLogout(); 
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center relative">
      {/* Botón para abrir el sidebar */}
      <button
        className="text-black bg-white focus:outline-none z-50"
        onClick={() => setCollapsed(false)}
      >
        <MenuIcon size={28} />
      </button>

      {/* Sidebar sin oscurecer la pantalla */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${collapsed ? "-translate-x-full" : "translate-x-0"}`}>
        <Sidebar width="250px" className="h-full bg-gray-800 text-white shadow-lg">
          <Menu>
            {/* Cerrar el Sidebar */}
            <MenuItem icon={<X />} onClick={() => setCollapsed(true)}>Cerrar</MenuItem>

            {/* Inicio */}
            <MenuItem icon={<Home />} component={<Link to="/" />}>Inicio</MenuItem>

            {/* Mis órdenes */}
            <MenuItem icon={<Box />} component={<Link to="/order" />}>Mis Ordenes</MenuItem>

            {/* Nueva orden */}
            <MenuItem icon={<Search />} component={<Link to="/order/create" />}>Nueva Orden</MenuItem>

            {/* Rastreo */}
            {/* <MenuItem icon={<Search />} component={<Link to="/tracking" />}>Rastreo</MenuItem> */}

            {/* Configuración */}
            {/* <MenuItem icon={<Settings />} component={<Link to="/settings" />}>Configuración</MenuItem> */}

            {/* Cerrar sesión */}
            <MenuItem icon={<LogOut />} onClick={handleLogout} className="text-red-400">Cerrar sesión</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </header>
  );
};

export default Header;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../presentation/pages/auth/Auth"; 
import Home from "../presentation/pages/home/Home"; 
// import Orders from "../presentation/pages/Orders/CreateOrder"; 
import CreateOrder from "../presentation/pages/orders/CreateOrder"; 
// import Clients from "../modules/clients/Clients"; 
// import Tracking from "../modules/tracking/Tracking";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Página de autenticación */}
        <Route path="/home" element={<Home />} /> {/* Página de inicio */}
        {/* <Route path="/orders" element={<Orders />} />  */}
        <Route path="/order/create" element={<CreateOrder />} /> {/* Página para crear orden */}
        {/* Descomenta las siguientes rutas si tienes esos módulos */}
        {/* <Route path="/clients" element={<Clients />} /> */}
        {/* <Route path="/tracking" element={<Tracking />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
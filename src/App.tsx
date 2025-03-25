import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Auth from "./presentation/pages/auth/Auth";
import Home from "./presentation/pages/home/Home"; 
import CreateOrder from "./presentation/pages/orders/CreateOrder"; 
import OrdersPage from "./presentation/pages/orders/OrdersPage";
import OrderDetailPage from "./presentation/pages/orders/OrderDetailPage";
import OrderDispatch from "./presentation/pages/orders/OrderDispatchPage";


const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/order/create" element={<CreateOrder />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/order/detail/:id" element={<OrderDetailPage />} />
          <Route path="/order/dispatch/:base64" element={<OrderDispatch />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RouteRegister from "./components/RouteRegister";
import RouteLogin from "./components/RouteLogin";
import RouteCustomer from "./components/RouteCustomer";
import RouteCustomers from "./components/RouteCustomers";
import RouteCustomerUpdate from "./components/RouteCustomerUpdate";
import RouteHistoryUpdate from "./components/RouteHistoryUpdate";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RouteRegister />} />
        <Route path="/login" element={<RouteLogin />} />
        <Route path="/customers" element={<RouteCustomers />} />
        <Route path="customer/:cId" element={<RouteCustomer />} />
        <Route path="customer-update/:cId" element={<RouteCustomerUpdate />} />
        <Route path="history-update/:hId" element={<RouteHistoryUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

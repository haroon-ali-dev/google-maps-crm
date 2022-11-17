import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteCustomer from "./components/RouteCustomer";
import RouteCustomers from "./components/RouteCustomers";
import RouteCustomerUpdate from "./components/RouteCustomerUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteCustomers />} />
        <Route path="customer/:cId" element={<RouteCustomer />} />
        <Route path="customer-update/:cId" element={<RouteCustomerUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

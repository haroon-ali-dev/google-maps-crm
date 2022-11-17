import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteCustomer from "./components/RouteCustomer";
import RouteCustomers from "./components/RouteCustomers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteCustomers />} />
        <Route path="customer/:cId" element={<RouteCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteCustomers from "./components/RouteCustomers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteCustomers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

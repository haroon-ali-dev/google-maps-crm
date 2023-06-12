import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedLogin from "./components/ProtectedLogin";
import ProtectedLogout from "./components/ProtectedLogout";
import RouteRegister from "./components/RouteRegister";
import RouteLogin from "./components/RouteLogin";
import RouteCustomer from "./components/RouteCustomer";
import RouteCustomers from "./components/RouteCustomers";
import RouteCustomerUpdate from "./components/RouteCustomerUpdate";
import RouteHistoryUpdate from "./components/RouteHistoryUpdate";

export const AppContext = React.createContext();

function App() {
  const apiURL = (process.env.NODE_ENV === "production") ? "https://dzq297bgi3r8y.cloudfront.net" : "http://localhost:3001";

  return (
    <AppContext.Provider value={apiURL}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedLogout><RouteRegister /></ProtectedLogout>} />
          <Route path="/login" element={<ProtectedLogout><RouteLogin /></ProtectedLogout>} />
          <Route path="/customers" element={<ProtectedLogin><RouteCustomers /></ProtectedLogin>} />
          <Route path="/customer/:cId" element={<ProtectedLogin><RouteCustomer /></ProtectedLogin>} />
          <Route path="/customer-update/:cId" element={<ProtectedLogin><RouteCustomerUpdate /></ProtectedLogin>} />
          <Route path="/history-update/:hId" element={<ProtectedLogin><RouteHistoryUpdate /></ProtectedLogin>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
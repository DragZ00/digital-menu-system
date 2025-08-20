import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";

// Header'ı kontrol eden Layout componenti
function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];

  return (
    <>
      {/* sadece /auth sayfasında Header gizlenecek */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

// App fonksiyonu en dışta BrowserRouter ile Layout'u sarmalıyor
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

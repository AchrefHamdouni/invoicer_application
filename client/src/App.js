import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Invoice from "./components/Invoice.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Clients from "./components/Clients.jsx";
import AllInvoices from "./components/AllInvoices.jsx";
import AddClient from "./components/AddClient.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <div className="App">
        {loggedIn ? (
          <Router>
            <div>
              <Home />
              <Routes>
                <Route exact path="/invoice" element={<Invoice />} />
                <Route exact path="/addclient" element={<AddClient />} />
                <Route exact path="/clients" element={<Clients />} />
                <Route exact path="/allinvoices" element={<AllInvoices />} />

              </Routes>
            </div>
          </Router>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </div>
    </div>
  );
}

export default App;

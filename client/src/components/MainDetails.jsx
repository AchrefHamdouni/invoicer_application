import React from "react";
import logo from "../img/logo.jpg";

function MainDetails() {
  return (
    <div>
      <img src={logo} className="App-logo w-60 h-20 mt-6" alt="logo" />

      <section className="flex flex-col justify-end">
        <h2 className="font-bold mt-6 text-2xl tracking-wide"> HNP Tunisie</h2>
        <p className="text-xs">
          <span className="font-bold">MF:</span> 1683667 T/A/C/000
        </p>
        <p className="text-xs">
          <span className="font-bold">Adresse:</span> Zone Industrielle Mghira
          Fouchena Ben Arous
        </p>
      </section>
    </div>
  );
}

export default MainDetails;

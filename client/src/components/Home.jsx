import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav>
      <ul className="flex flex space-x-36 bg-black hover:bg-cyan-600 px-48 text-2xl h-24">
      <li>
      <Link to={"./addclient"} 
      className="flex font-bold text-red-500 tracking-wider mt-6 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 rounded-xl">Ajouter Client</Link>
    </li>
        <li>
          <Link to={"./clients"} className="flex font-bold text-white tracking-wider mt-6 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 rounded-xl">Nos Clients</Link>
        </li>
        <li>
        <Link to={"./allinvoices"} 
        className="flex font-bold text-red-500 tracking-wider mt-6 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 rounded-xl">Nos Factures</Link>
      </li>
      <li>
      <Link to={"./invoice"} className="flex font-bold text-white tracking-wider mt-6 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 rounded-xl ">Créer Facture</Link>
    </li>
      </ul>
    </nav>
  );
};

export default Home;

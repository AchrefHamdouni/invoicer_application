import React from "react";
function Header({ handlePrint }) {
  return (
    <div>
    <div>
    <h1 className="mr-8 text-5xl font-mono font-bold uppercase tracking-wide text-red-500 flex item-end justify-end">
      Facture
    </h1>
  </div>
    </div>
  );
}

export default Header;


// <header className=" mb-5">
      //   <div>
      //     <ul className="flex item-center justify-between flex-wrap">
      //       <li>
      //         <button
      //           onClick={handlePrint}
      //           className="bg-red-600 text-white font-bold  py-2 px-8 rounded shadow border-2 border-gray-300 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
      //         >
      //           Imprimer
      //         </button>
      //       </li>
      //       <li>
      //         <button className="bg-red-500 text-white font-bold  py-2 px-8 rounded shadow border-2 border-blue-300 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
      //           Enregistrer
      //         </button>
      //       </li>
      //       <li>
      //         <button className="bg-red-400 text-white font-bold  py-2 px-8 rounded shadow border-2 border-green-300 hover:bg-transparent hover:text-green-500 transition-all duration-300">
      //           Envoyer
      //         </button>
      //       </li>
      //     </ul>
      //   </div>
      //   <div>
      //     <h1 className="mr-8 text-5xl font-mono font-bold uppercase tracking-wide text-red-500 flex item-end justify-end">
      //       Facture
      //     </h1>
      //   </div>
      // </header>
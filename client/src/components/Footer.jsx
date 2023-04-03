import React from "react";

function Footer() {
  return (
    <div className="absolute bottom-0 w-full px-6 py-6" >
      <footer className="static footer border-t-2 border-red-300 pt-5 mb-0">
        <ul className="text-xl font-bold flex flex-wrap items-center justify-center">
          <li>HNP Tunisie</li>
        </ul>
        <ul className=" flex flex-wrap items-center justify-center">
          <li>
            <span className="font-bold ml-2">Email: </span>hnptunisie@gmail.com
          </li>
          <li>
            <span className="font-bold ml-2">Tel: </span>+216 55 755 108 +216 54 750
            133
          </li>
          <li>
            <span className="font-bold ml-2">Fax: </span>+216 32 406 540
          </li>
        </ul>
        <ul className="flex flex-wrap items-center justify-center">
        <li>
        <span className="font-bold ">Banque: </span> Zitouna Agence Mghira{" "}
      </li>
          <li>
            <span className="font-bold ml-2">RIB: </span> 123456678889999{" "}
          </li>
        
        </ul>
      </footer>
    </div>
  );
}

export default Footer;

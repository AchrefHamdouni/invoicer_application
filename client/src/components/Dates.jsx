import React from "react";

function Dates({ invoiceDate, invoiceNumber }) {
  return (
    <div>
      <article className="mb-12 flex  text-xs">
        <ul>
          <li>
            <span className="font-bold">Référence:</span>
            <span>F2023/</span>
            {invoiceNumber}
          </li>
          <li>
            <span className="font-bold">Date:</span>
            {invoiceDate}
          </li>
        </ul>
      </article>
    </div>
  );
}

export default Dates;

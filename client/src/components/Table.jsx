import React from "react";

function Table({ list, totalHt, totalTtc, totalTva }) {
  return (
    <div className="tableau">
      <table width="100%" className=" justify-center">
        <thead>
          <tr className="h-10">
            <td className="font-bold w-2/5 text-xs  ">Désignation</td>
            <td className="font-bold w-1/12 text-xs">Unité</td>
            <td className="font-bold w-1/12 text-xs">Quantité</td>
            <td className="font-bold text-xs">Prix unitaire HT</td>
            <td className="font-bold text-xs">Prix Partiel HT</td>
            <td className="font-bold w-1/12 text-xs">TVA %</td>
          </tr>
        </thead>
        {list.map(
          ({ id, designation, unité, quantité, punitaire, ppartiel, tva }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr className="h-10 text-xs">
                  <td>{designation}</td>
                  <td>{unité}</td>
                  <td>{quantité}</td>
                  <td>{Number.parseFloat(punitaire).toFixed(3)}</td>
                  <td>{Number.parseFloat(ppartiel).toFixed(3)}</td>
                  <td>{tva}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
      <table width="95%" className=" flex flex-wrap items-end justify-end  ">
        <tbody>
          <tr>
            <td className="font-bold  ">Total HTVA</td>
            <td> {Number.parseFloat(totalHt).toFixed(3)}</td>
          </tr>
          <tr>
            <td className="font-bold">Total TVA</td>
            <td> {Number.parseFloat(totalTva).toFixed(3)}</td>
          </tr>
          <tr>
            <td className="font-bold">Timbre</td>
            <td> {Number.parseFloat(1).toFixed(3)}</td>
          </tr>
          <tr>
            <td className="font-bold">Total TTC</td>
            <td> {Number.parseFloat(totalTtc).toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

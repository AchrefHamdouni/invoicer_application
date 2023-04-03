import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function TableForm({
  designation,
  setDesignation,
  unité,
  setUnité,
  punitaire,
  setPunitaire,
  ppartiel,
  setPpartiel,
  tva,
  setTva,
  quantité,
  setQuantité,
  list,
  setList,
  detail,
  setDetail,
  totalHt,
  setTotalHt,
  totalTtc,
  setTotalTtc,
  totalTva,
  setTotalTva,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!designation || !quantité || !punitaire) {
      alert("Veuillez remplir tous les champs");
    } else {
      const newItem = {
        id: uuidv4(),
        designation: designation,
        unité: unité,
        quantité: quantité,
        punitaire: punitaire,
        ppartiel: ppartiel,
        tva: tva,
      };
      const newDetail={
        product_name:designation,
        product_unit:unité,
        product_qty:quantité,
        product_price:punitaire,
        product_amount:ppartiel,
        product_tva:tva
      }
      setDesignation("");
      setUnité("");
      setQuantité("");
      setPunitaire("");
      setPpartiel("");
      setTva("");
      setList([...list, newItem]);
      setDetail([...detail, newDetail]);
      setIsEditing(false);
      console.log(list);
    }
  };

  useEffect(() => {
    const calculateAmount = (ppartiel) => {
      setPpartiel(quantité * punitaire);
    };
    calculateAmount(ppartiel);
  }, [ppartiel, punitaire, quantité, setPpartiel]);
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
      setTotalHt(sum);
    }
  });
  useEffect(() => {
    let sumTva = 0;
    for (let i = 0; i < list.length; i++) {
      // if(list[i].tva==19){
      // sumTva+=list[i].ppartiel*0.19
      // }else if(list[i].tva==7){
      //   sumTva+=list[i].ppartiel*0.07
      // }
      // else {
      //   sumTva+=list[i].tva*0
      // }
      sumTva += list[i].ppartiel * list[i].tva * 0.01;
      setTotalTva(sumTva);
    }
  });

  useEffect(() => {
    let sumTtc = 0;
    sumTtc = totalHt + totalTva + 1; //1 dinar le timbre fiscal
  
    setTotalTtc(sumTtc);
  });

  const deleteRow = (id) => setList(list.filter((row) => row.id !== id));

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDesignation(editingRow.designation);
    setQuantité(editingRow.quantité);
    setPunitaire(editingRow.punitaire);
    setUnité(editingRow.unité);
    setTva(editingRow.tva);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-16 font-bold justify-items-stretch  ">
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="designation"
            autoComplete="on"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          ></input>

          <div className="md:grid grid-cols-10 gap-2 mt-2">
            <label htmlFor=" unité">Unité</label>
            <input
              type="text"
              name=" unité"
              id=" unité"
              placeholder=" unité"
              autoComplete="on"
              value={unité}
              onChange={(e) => setUnité(e.target.value)}
            ></input>

            <label htmlFor="quantité">Qté</label>
            <input
              type="text"
              name="quantité"
              id="quantité"
              placeholder="quantité"
              value={quantité}
              onChange={(e) => setQuantité(e.target.value)}
            ></input>

            <label htmlFor="punitaire">PU HT</label>
            <input
              type="text"
              name="punitaire"
              id="designation"
              placeholder="p unitaire"
              value={punitaire}
              onChange={(e) => setPunitaire(e.target.value)}
            ></input>

            <label htmlFor="ppartiel">PP HT</label>
            <p>{ppartiel}</p>

            <label htmlFor="tva">TVA %</label>
            <input
              type="number"
              name="tva"
              id="tva"
              placeholder="tva"
              autoComplete="on"
              value={tva}
              onChange={(e) => setTva(e.target.value)}
            ></input>
          </div>
        </div>
        <button
          className="mb-5 mt-5 bg-gray-600 text-white font-bold  py-2 px-2 rounded shadow border-2 border-gray-300 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
          type="submit"
        >
          Ajouter
        </button>
      </form>
      <div>
        <table width="100%">
          <thead>
            <tr>
              <td className="font-bold w-2/5">Désignation</td>
              <td className="font-bold">Unité</td>
              <td className="font-bold ">Quantité</td>
              <td className="font-bold">PU HT</td>
              <td className="font-bold">PP HT</td>
              <td className="font-bold w-1/12">TVA %</td>
            </tr>
          </thead>
          {list.map(
            ({
              id,
              designation,
              unité,
              quantité,
              punitaire,
              ppartiel,
              tva,
            }) => (
              <React.Fragment key={id}>
                <tbody>
                  <tr className="content-center">
                    <td>{designation}</td>
                    <td>{unité}</td>
                    <td>{quantité}</td>
                    <td>{Number.parseFloat(punitaire).toFixed(3)}</td>
                    <td className="amount ">
                      {Number.parseFloat(ppartiel).toFixed(3)}
                    </td>
                    <td className="tva">{tva}</td>
                    <td>
                      <button onClick={() => editRow(id)}>
                        <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteRow(id)}>
                        <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            )
          )}
        </table>
        <table width="80%" className=" flex flex-wrap items-end justify-end ">
          <tbody>
            <tr>
              <td className="font-bold">Total HTVA</td>
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
    </div>
  );
}

export default TableForm;

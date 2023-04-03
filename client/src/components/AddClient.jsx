import React, { useState } from "react";
import axios from "axios";

function AddClient() {
  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newClient = {
      name_client: name,
      mf_client: matricule,
      adress_client: address,
      mobile_client: mobile,
    };
    axios
      .post("http://localhost:3000/client", newClient)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setName("");
    setAddress("");
    setMobile("");
    setMatricule("");
  };

  return (
    <div>
      <h2 className="text-4xl my-6 mx-36">Ajouter Client</h2>
      <form
        className="bg-white mx-48 w-3/6 grid grid-cols-2 gap-10 font-bold"
        onSubmit={handleSubmit}
      >
        <div className="mt-6 mx-12 font-bold flex flex-col">
          <label htmlFor="name">Nom du client:</label>
          <input
            className="h-8"
            type="text"
            id="name"
            placeholder="Nom du client"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mt-6 mx-12 font-bold flex flex-col">
          <label htmlFor="matriculeFiscal">Matricule Fiscal:</label>
          <input
            className="h-8"
            type="text"
            id="matriculeFiscal"
            placeholder="Matricule Fiscal"
            value={matricule}
            onChange={(event) => setMatricule(event.target.value)}
            required
          />
        </div>
        <div className="mt-6 mx-12 font-bold flex flex-col">
          <label htmlFor="address">Adresse:</label>
          <input
            className="h-8"
            type="text"
            id="address"
            placeholder="Adresse"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="mt-6 mx-12 font-bold flex flex-col">
          <label htmlFor="mobile">Téléphone:</label>
          <input
            className="h-8"
            type="text"
            id="mobile"
            placeholder="Téléphone"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
        <button
          className="mx-24 mt-6 mb-5 bg-red-600 text-white font-bold  py-2 px-8 rounded shadow border-2 border-red-300 hover:bg-transparent hover:text-red-500 transition-all duration-300"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddClient;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function Clients() {
  const [clientsData, setClientsData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newName, setNewName] = useState("");
  const [newMF, setNewMF] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newMobile, setNewMobile] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/clients")
      .then((response) => {
        setClientsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteRow = (id) =>
  {
    axios
    .delete(`http://localhost:3000/client/${id}`)
    .then((response) => {
      setClientsData(clientsData.filter((client) => client.id_client !== id));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const editRow = (id) => {
    const editingRow = clientsData.find((row) => row.id_client === id);
    setEditingRow(editingRow);
    setNewName(editingRow.name_client);
    setNewMF(editingRow.mf_client);
    setNewAddress(editingRow.adress_client);
    setNewMobile(editingRow.mobile_client);
  };

  const saveEdit = (id) => {
    axios
      .put(`http://localhost:3000/client/${id}`, {
        name_client: newName,
        mf_client: newMF,
        adress_client: newAddress,
        mobile_client: newMobile,
      })
      .then(() => {
        setEditingRow(null);
        setClientsData(
          clientsData.map((client) => {
            if (client.id_client === id) {
              client.name_client = newName;
              client.mf_client = newMF;
              client.adress_client = newAddress;
              client.mobile_client = newMobile;
            }
            return client;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-4xl my-6 mx-36">Nos Clients</h2>
      <table className="table-auto border-collapse border border-slate-400 mx-36 my-6 bg-white">
        <thead>
          <tr>
            <th className="border border-black px-4 text-center w-16">N°</th>
            <th className="border border-black px-4 text-center w-72">
              Nom du client
            </th>
            <th className="border border-black px-4 text-center w-72">
              Matricule Fiscal
            </th>
            <th className="border border-black px-4 text-center w-96">
              Adresse
            </th>
            <th className="border border-black px-4 text-center w-48">
              Téléphone
            </th>
          
          </tr>
        </thead>
        <tbody>
          {clientsData.map((client) => (
            <tr key={client.id_client}>
              <td className="border border-black px-4 text-center font-bold">
                {client.id_client}
              </td>
              <td className="border border-black px-4 text-left">
                {editingRow?.id_client === client.id_client ? (
                  <input
                    type="text"
                    placeholder={client.name_client}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  client.name_client
                )}
              </td>
              <td className="border border-black px-4 text-left">
                {editingRow?.id_client === client.id_client ? (
                  <input
                    type="text"
                    placeholder={client.mf_client}
                    value={newMF}
                    onChange={(e) => setNewMF(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  client.mf_client
                )}
              </td>
              <td className="border border-black px-4 text-left">
                {editingRow?.id_client === client.id_client ? (
                  <input
                    type="text"
                    placeholder={client.adress_client}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  client.adress_client
                )}
              </td>
              <td className="border border-black px-4 text-left">
                {editingRow?.id_client === client.id_client ? (
                  <input
                    type="text"
                    placeholder={client.mobile_client}
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  client.mobile_client
                )}
              </td>
              <td className="border border-black px-4 text-center">
                {editingRow?.id_client === client.id_client ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => saveEdit(client.id_client)}
                  >
                    Save
                  </button>
                ) : (
                  <AiOutlineEdit
                    className="text-green-500 cursor-pointer hover:text-green-700"
                    onClick={() => editRow(client.id_client)}
                  />
                )}
              </td>
              <td className="border border-black px-4 text-center">
                <AiOutlineDelete
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => deleteRow(client.id_client)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;

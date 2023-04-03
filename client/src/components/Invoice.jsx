import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Notes from "./Notes.jsx";
import MainDetails from "./MainDetails.jsx";
import ClientDetails from "./ClientDetails.jsx";
import Dates from "./Dates.jsx";
import Table from "./Table.jsx";
import TableForm from "./TableForm.jsx";
import ReactToPrint from "react-to-print";

function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientMF, setClientMF] = useState("");
  const [clientId, setClientId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [notes, setNotes] = useState("");
  const [designation, setDesignation] = useState("");
  const [quantité, setQuantité] = useState("");
  const [unité, setUnité] = useState("");
  const [punitaire, setPunitaire] = useState("");
  const [ppartiel, setPpartiel] = useState("");
  const [tva, setTva] = useState("");
  const [list, setList] = useState([]);
  const [totalHt, setTotalHt] = useState(0);
  const [totalTtc, setTotalTtc] = useState(0);
  const [totalTva, setTotalTva] = useState(0);
  const [clientList, setClientList] = useState([]);
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/clients").then((response) => {
      console.log(response.data);
      setClientList(response.data);
    });
  }, []);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const saveInvoice = () => {
    axios
      .post("http://localhost:3000/invoice", {
        id_client: clientId,
        ref_invoice:invoiceNumber,
        date_invoice: invoiceDate,
        amount_invoice: totalTtc,
        details: detail,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white">
        <ReactToPrint
          trigger={() => (
            <div className="flex space-x-64">
            
              <button
                onClick={() => {
                  saveInvoice();
                  setShowInvoice(false);
                }}
                className="mx-24 bg-red-400 text-white font-bold  py-2 px-8 rounded shadow border-2 border-gray-300 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
              >
                Enregistrer/Imprimer
              </button>
            </div>
          )}
          content={() => componentRef.current}
        />

        {showInvoice ? (
          <div >
            <div ref={componentRef} className="flex flex-col h-screen p-8">
              <Header handlePrint={handlePrint} />
              <MainDetails />
              <ClientDetails
                clientName={clientName}
                clientPhone={clientPhone}
                clientAddress={clientAddress}
                clientMF={clientMF}
              />
              <Dates invoiceDate={invoiceDate} invoiceNumber={invoiceNumber} />
              <Table
                designation={designation}
                unité={unité}
                quantité={quantité}
                punitaire={punitaire}
                ppartiel={ppartiel}
                tva={tva}
                list={list}
                setList={setList}
                totalHt={totalHt}
                setTotalHt={setTotalHt}
                totalTtc={totalTtc}
                setTotalTtc={setTotalTtc}
                totalTva={totalTva}
                setTotalTva={setTotalTva}
              />
              <Notes notes={notes} />
              <Footer className="absolute bottom-0 w-full px-6 py-6"/>
            </div>
            <button
              onClick={() => setShowInvoice(false)}
              className="bg-red-600 mt-6 text-white font-bold  py-2 px-8 rounded shadow border-2 border-red-300 hover:bg-transparent hover:text-red-500 transition-all duration-300"
            >
              Modifier Facture
            </button>
          </div>
        ) : (
          <div className="bg-orange-50 flex flex-col justify-center">
            <article className="grid grid-cols-2 gap-10 font-bold">
              <div className="flex flex-col">
                <label htmlFor="clientName">Nom du client</label>
                <select
                  name="clientName"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => {
                    const selectedClientName = e.target.value;
                    const selectedClient = clientList.find(
                      (client) => client.name_client === selectedClientName
                    );
                    if (selectedClientName) {
                      setClientName(selectedClientName);
                      setClientMF(selectedClient.mf_client);
                      setClientAddress(selectedClient.adress_client);
                      setClientPhone(selectedClient.mobile_client);
                      setClientId(selectedClient.id_client);
                    }
                  }}
                >
                  <option value="">Choisir un client</option>
                  {clientList.map((client) => (
                    <option key={client.id_client} value={client.name_client}>
                      {client.name_client}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="clientAdress">Adresse du client</label>
                <input
                  type="text"
                  name="clientAddress"
                  id="clientAddress"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                ></input>
              </div>
            </article>
            <article className="grid grid-cols-2 gap-10 font-bold  ">
              <div className="flex flex-col">
                <label htmlFor="clientMF">Matricule Fiscal</label>
                <input
                  type="text"
                  name="clientMF"
                  id="clientMF"
                  value={clientMF}
                  onChange={(e) => setClientMF(e.target.value)}
                ></input>
              </div>

              <div className="flex flex-col">
                <label htmlFor="clientPhone">Téléphone</label>
                <input
                  type="text"
                  name="clientPhone"
                  id="clientPhone"
                  placeholder="Entrer le Num de Téléphone"
                  autoComplete="on"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                ></input>
              </div>
            </article>
            <article className="grid grid-cols-2 gap-10  ">
              <div className="flex flex-col font-bold ">
                <label htmlFor="invoiceNumber">Num de facture</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  placeholder="Numéro de facture"
                  autoComplete="off"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col font-bold ">
                <label htmlFor="invoiceDate">Date de la facture</label>
                <input
                  type="date"
                  name="invoiceDate"
                  id="invoiceDate"
                  placeholder="Date de facture"
                  autoComplete="off"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                ></input>
              </div>
            </article>

            <TableForm
              designation={designation}
              setDesignation={setDesignation}
              unité={unité}
              setUnité={setUnité}
              quantité={quantité}
              setQuantité={setQuantité}
              punitaire={punitaire}
              setPunitaire={setPunitaire}
              ppartiel={ppartiel}
              setPpartiel={setPpartiel}
              tva={tva}
              setTva={setTva}
              list={list}
              setList={setList}
              detail={detail}
              setDetail={setDetail}
              totalHt={totalHt}
              setTotalHt={setTotalHt}
              totalTtc={totalTtc}
              setTotalTtc={setTotalTtc}
              totalTva={totalTva}
              setTotalTva={setTotalTva}
            />

            <label htmlFor="notes" className="font-bold ">
              Notes...
            </label>
            <textarea
              name="notes"
              id="notes"
              cols="30"
              row="10"
              placeholder="Notes additionelles"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button
              onClick={() => setShowInvoice(true)}
              className="bg-red-600 text-white font-bold  py-2 px-8 rounded shadow border-2 border-red-300 hover:bg-transparent hover:text-red-500 transition-all duration-300"
            >
              Aperçu Facture
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Invoice;

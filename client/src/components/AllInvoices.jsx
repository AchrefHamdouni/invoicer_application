import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllInvoices() {
  const [invoicesData, setInvoicesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/invoices')
      .then(response => {
        setInvoicesData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  
  return (
    <div>
      <h2 className='text-4xl my-6 mx-36'>Nos Factures</h2>
      <table className='table-auto border-collapse border border-slate-300 mx-36 my-6 bg-white'>
        <thead>
          <tr >
            <th className='border border-black px-4 text-center w-72'>Réference</th>
            <th className='border border-black px-4 text-center w-72'>Date</th>
            <th className='border border-black px-4 text-center w-72'>Nom du client</th>
            <th className='border border-black px-4 text-center w-72'>Montant de la facture</th>
          </tr>
        </thead>
        <tbody>
          {invoicesData.map(invoice => (
            <tr key={invoice.id_invoice}>
              <td className='border border-black px-4 text-center w-72 '>"{invoice.ref_invoice}"</td>
              <td className='border border-black px-4 text-center w-72 '>{invoice.date_invoice}</td>
              <td className='border border-black px-4 text-center w-72 '>{invoice.name_client}</td>
              <td className='border border-black px-4 text-center w-72'>{Number.parseFloat(invoice.amount_invoice).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllInvoices;

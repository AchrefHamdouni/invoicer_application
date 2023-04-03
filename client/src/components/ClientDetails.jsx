import React from 'react'

function ClientDetails({clientName,clientAddress,clientMF,clientPhone}) {
  return (
    <div>
      <section className='  flex flex-col items-end justify-start '>
      <h2 className='text-base uppercase font-bold'>{clientName}</h2>
      <p className='text-xs'> <span className="font-bold  ">Matricule Fiscal </span>{clientMF}</p>
      <p className='text-xs'> <span className="font-bold">Adresse: </span>{clientAddress}</p>
      <p className='text-xs'><span className="font-bold">Tel: </span>{clientPhone}</p>
      </section>
    </div>
  )
}

export default ClientDetails

import React from 'react'

function Notes({notes}) {
  return (
    <div>
    <section className='mt-20 mb-5'>
    <p> <span className="font-bold">Notes: </span> {notes.length? notes:"Aucune note"}</p>
  </section>
    </div>
  )
}

export default Notes

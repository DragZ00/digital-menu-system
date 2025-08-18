import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'


const Tables = () => {
  const [status, setStatus] = useState("Hepsi");

  return (
    <section className="bg-cyan-900 h-[calc(100vh-5rem)] overflow-hidden">
      {/* ÜST BAR */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-2xl font-bold tracking-wide">Masalar</h1>
        </div>
         <div className='flex items-center justify-around gap-4'>
          <button  onClick ={()=> setStatus("Hepsi")} className={`text-[#ababab] text-lg ${status === "Hepsi" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Hepsi</button>

          <button onClick ={()=> setStatus("Rezerve Edildi")} className={`text-[#ababab] text-lg ${status === "Rezerve Edildi" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Rezerve Edildi</button>
          
        </div>            
        </div>
       
       <div className="  flex flex-wrap gap-5 p-10 py-5 overflow-y-scroll h-[700px] scrollbar-hide   ">
   {
  tables.map((table) => (
    <TableCard 
      key={table.id}              // Sadece React için
      id={table.id}               // Senin kullanman için prop
      name={table.name}
      status={table.status}
      initials={table.initials}
      seats={table.seats}
    />
  ))
}

       </div>


       
      <BottomNav />
    </section>
  )
}

export default Tables

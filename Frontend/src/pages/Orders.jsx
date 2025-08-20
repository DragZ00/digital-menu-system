import React, {useState} from 'react'
import BottomNav from '../components/shared/BottomNav'
import  OrdersCard  from '../components/orders/OrdersCard'
import BackButton from '../components/shared/BackButton'


const Orders = () => {
   const[status, setStatus] = useState("Hepsi");
  return (
    <section className=' bg-cyan-900 h-[calc(100vh-5rem)] overflow-hidden' >
      <div className='flex items-center justify-between px-8 py-4'>
        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-white text-xl font-bold tracking-wide'>Siparişler</h1>
        </div>
        <div className='flex items-center justify-around gap-4'>
          <button  onClick ={()=> setStatus("Hepsi")} className={`text-[#ababab] text-lg ${status === "Hepsi" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Hepsi</button>

          <button onClick ={()=> setStatus("Devam etmekte")} className={`text-[#ababab] text-lg ${status === "Devam etmekte" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Devam etmekte</button>
          <button  onClick ={()=> setStatus("Hazır")} className={`text-[#ababab] text-lg ${status === "Hazır" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Hazır</button>
          <button  onClick ={()=> setStatus("Tamamlanan")} className={`text-[#ababab] text-lg ${status === "Tamamlanan" && "bg-[#383838] rounded-lg px-5 py-2" } rounded-lg px-5 py-2  font-semibold`}>Tamamlanan</button>
        </div>


      </div>

      <div className=" flex flex-wrap gap-6 px-16 py-4  overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem-5rem)]"> 
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
          <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
         <OrdersCard />
          <OrdersCard />
         <OrdersCard />
         <OrdersCard />
      </div>
     
      <BottomNav />
    </section>
    
  )
}

export default Orders
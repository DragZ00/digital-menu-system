import React from 'react'
import { FaSearch } from 'react-icons/fa'   
import { OrderList } from './OrderList'

const RecentOrders = () => {
  return (
    <div className='px-8 mt-6'>
        <div className='bg-blue-950 w-full h-[450px] rounded-lg'>
            <div className='flex justify-between items-center px-6 py-4'>
                <h1 className='text-amber-50 text-lg font-semibold tracking-wide'>Son Siparişler</h1>
                <a href="" className=' text-blue-500 text-sm font-semibold'>Tümünü Gör</a>

            </div>

          <div className="flex items-center gap-4 bg-cyan-950 p-2 rounded-[20px] px-6 py-4 mx-6 ">
            <FaSearch className="text-[#f5f5f5]" />
            <input type="text" 
             placeholder="Son siparişleri ara "
             className="bg-transparent text-[#f5f5f5] outline-none" />
          </div>

          {/* Sipariş Listesi */}
          <div className="mt-4 px-6 gap-2 overflow-y-scroll h-[300px] scrollbar-hide">
            <OrderList />
            <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />

          </div>
          

        </div>
    </div>
  )
}

export default RecentOrders
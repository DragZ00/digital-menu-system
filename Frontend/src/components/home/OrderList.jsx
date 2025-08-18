import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'

export const OrderList = () => {
  return (
    <div className='flex items-center gap-6'>
        <button className='bg-[#f6b100] px-4 text-xl font-bold rounded-lg'>EN</button>
        <div className='flex items-center justify-between w-[100%]'>
            <div>
                <h1 className='text-amber-50 tex-lg font-semibold tracking-wide'>Yönetici</h1>
                <p className='text[#ababab] text-sm'>8 Sipariş</p>

            
            </div>
            
            <div>
              <h1 className='text-amber-400 font-semibold border border-amber-400 rounded-lg p-1'>Masa No : 3</h1>
            </div>

            <div className='flex flex-col items-start gap-2'>
                <p className='bg-green-600 px-4'><FaCheckDouble className='inline mr-2' />Hazır</p>
                <p className='text-[#ababab] text-sm'> <FaCircle className='inline mr-2 text-green-600' />Servisi Hazır</p>
            </div>


        </div>
    
    </div>
  )
}

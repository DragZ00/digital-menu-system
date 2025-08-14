import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from 'react-icons/md'
import { CiCircleMore } from 'react-icons/ci'
import { BiSolidDish } from 'react-icons/bi'


function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1f2937] flex justify-around   py-2 h-16">
        {/* Butonlar */}
        <button className='flex items-center justify-between text-[#ababab] bg-[#343434] '><FaHome className='inline mr-2   rounded-[20px]' size={20} /> 
        <p>Home</p></button>
        <button className='flex items-center justify-between text-[#ababab]'><MdOutlineReorder className='inline mr-2  ' size={20} /> <p>Sipariş</p></button>
        <button className=' flex items-center justify-between text-[#ababab]'><MdTableBar className='inline mr-2  ' size={20} /><p>Masalar</p></button>
        <button className='flex items-center justify-between text-[#ababab]'><CiCircleMore className='inline mr-2  ' size={20} /><p>Daha Fazla</p></button>

        <button className='absolute bg-yellow-300 text-[#f5f5f5] rounded-full p-3 items-center' >
            <BiSolidDish size={30}/>
            </button>
    </div>
  )
}

export default BottomNav
import React from 'react'
import{FaSearch} from "react-icons/fa"
import { FaUserCircle } from 'react-icons/fa'
import{FaBell}from "react-icons/fa"
import logo from '../../assets/images/logo.png'
import { useSelector } from 'react-redux'


const Header = () => {

   const userData = useSelector(state=> state.user);

  return (
    //üst kısım logo kısmı 
    <header className="flex justify-between items-center py-4 px-8 bg-[#1f2937]">
      <div className="flex items-center gap-2">
        <img src={logo} alt="restro logo" className="h-8 w-8" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Resturant</h1>
      </div>

      {/* Arama çubuğu */}
      <div className="flex items-center gap-4 bg-cyan-950 p-2 rounded-[20px] px-5 py-2 w-[500px] ">
        <FaSearch className="text-[#f5f5f5]" />
        <input type="text" 
         placeholder="Arama "
         className="bg-transparent text-[#f5f5f5] outline-none" />
      </div>

      <div className="flex items-center gap-4">
        <div className='bg-cyan-950 rounded-[15px] p-3 cursor-pointer'>
          <FaBell className="text-[#f5f5f5] text-2xl"  />
        </div>
      

     {/* Bildirimler */}

        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-2xl"  />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5]">{userData.name || "TEST kullanıcısı"}</h1>
            <p className="text-sm text-[#ababab] font-medium">{userData.role || "rol"}</p>
          </div>
        </div>

      </div>

    </header>
  )
}

export default Header
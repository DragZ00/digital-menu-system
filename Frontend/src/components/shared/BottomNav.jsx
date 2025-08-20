import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from 'react-icons/md'
import { CiCircleMore } from 'react-icons/ci'
import { BiSolidDish } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from './Modal'
import{useDispatch} from "react-redux";
import { setCustomer } from '../../redux/slices/customerSlice'

const BottomNav = () => {

  const navigate = useNavigate();
  const location =  useLocation();
  const dispatch = useDispatch();
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[guestCount,setGuestCount] = useState(0);
  const[name, setName] = useState();
  const[phone,setPhone] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const increment = () => {
    if(guestCount >=6)return;
    setGuestCount((prev) => prev+1);
  }
  const decrement = () => {
    if(guestCount <=0) return;
    setGuestCount ((prev) => prev-1);
  }
  const isActive = (path) => location === path;
  const handleCreateOrder = () => {
    dispatch(setCustomer({name,phone, guests: guestCount}));
    navigate("/tables");
  }



  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1f2937] py-2 h-16 flex items-center justify-around">
      {/* Butonlar */}
<button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold w-[180px] rounded-[20px] px-4 py-2 
          ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"}`}
      >
        <FaHome className="inline mr-2" size={20} />
        <p>Home</p>
      </button>

      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold w-[180px] rounded-[20px] px-4 py-2 
          ${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"}`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} />
        <p>Sipariş</p>
      </button>

      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold w-[180px] rounded-[20px] px-4 py-2 
          ${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"}`}
      >
        <MdTableBar className="inline mr-2" size={20} />
        <p>Masalar</p>
      </button>
      <button className="flex items-center justify-center text-[#ababab] rounded-[20px] px-4">
        <CiCircleMore className='inline mr-2' size={20} />
        <p>Daha Fazla</p>
      </button>
    {/* Ortadaki sarı buton */}
      
        <button disabled = {isActive("/tables") || isActive("/menu")} onClick={openModal}className='bg-yellow-300 text-[#f5f5f5] rounded-full p-4 flex items-center justify-center absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg'>
          <BiSolidDish size={50}/>
        </button>
     

<Modal isOpen={isModalOpen} onClose={closeModal} title="Sipariş Oluştur">
  {/* Müşteri İsmi */}
  <div className="block text-[#ababab] mb-2 text-sm font-medium">
    <label>Müşteri İsmi</label>
    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name=""
        placeholder="Müşteri İsmini Giriniz"
        id=""
        className="bg-transparent flex-1 text-white focus:outline-none"
      />
    </div>
  </div>
  <div className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
  <label>Müşteri Telefon</label>
  <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
    <input
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
      type="number"
      name=""
      placeholder="+90 5xxxxxxxxx"
      id=""
      className="bg-transparent flex-1 text-white focus:outline-none"
    />
  </div>
</div>


  {/* Ziyaretçi Sayaç */}
  <div className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
    <label>Ziyaretçi</label>
    <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
      <button onClick={decrement} className="text-yellow-500 text-2xl">&minus;</button>
      <span className="text-white">{guestCount} Kişilik </span>
      <button onClick={increment} className="text-yellow-500 text-2xl">&#43;</button>
    </div>
  </div>

  {/* Sipariş Butonu */}
  <button  onClick={handleCreateOrder}className="w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 mt-8">
    Sipariş Oluştur
  </button>
</Modal>

    </div>
  )
}

export default BottomNav

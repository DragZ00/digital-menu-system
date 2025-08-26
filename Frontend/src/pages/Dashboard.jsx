import React, { useState } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";              
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import DeleteTableModal from "../components/dashboard/DeleteTableModal";
import AddDishModal from '../components/dashboard/AddDishModal';
import DeleteDishModal from '../components/dashboard/DeleteDishModal';



const buttons = [
  { label: "Masa Ekle",   icon: <MdTableBar />, action: "table-add" },
  { label: "Masa Çıkar",  icon: <FaTrashAlt />, action: "table-delete" }, 
  { label: "Yemek Ekle",    icon: <BiSolidDish />, action: "dish-add" },
  { label: "Yemek Çıkar", icon: <FaTrashAlt />, action: "dish-delete" },
];

const tabs = ["İstatistikler", "Siparişler", "Ödemeler"];

const Dashboard = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDishAddOpen, setIsDishAddOpen] = useState(false);
   const [isDishDeleteOpen, setIsDishDeleteOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState("İstatistikler");

  const handleOpenModal = (action) => {
    if (action === "table-add") setIsTableModalOpen(true);
    if (action === "table-delete") setIsDeleteModalOpen(true); 
    if (action === "dish-add")     setIsDishAddOpen(true);
    if (action === "dish-delete")  setIsDishDeleteOpen(true);      
    // diğer aksiyonlar burada ele alınabilir
  };

  return (
    <div className="bg-[#000000] h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
        {/* Üst butonlar */}
        <div className="flex items-center gap-3 flex-wrap">
          {buttons.map(({ label, icon, action }) => (
            <button
              key={action} 
              onClick={() => handleOpenModal(action)}
              className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
            >
              {label} {icon}
            </button>
          ))}
        </div>

        {/* Sekmeler */}
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab} 
              className={`px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${
                activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* İçerik */}
      {activeTab === "İstatistikler" && <Metrics />}
      {activeTab === "Siparişler" && <RecentOrders />}

      {/* Modallar */}
      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
      {isDeleteModalOpen && <DeleteTableModal setOpen={setIsDeleteModalOpen} />} 
      {isDishAddOpen && (<AddDishModal setOpen={setIsDishAddOpen} />)}
 {isDishDeleteOpen && (<DeleteDishModal setOpen={setIsDishDeleteOpen} />)}
    </div>
  );
};

export default Dashboard;

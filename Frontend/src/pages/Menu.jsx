// src/pages/Menu.jsx
import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";

import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";



const Menu = () => {
  const customerData = useSelector((state) => state.customer);
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Sol alan */}
      <div className="flex-[3] overflow-auto">
        {/* ÜST BAŞLIK: solda Menü, sağda Müşteri Adı (tek satır) */}
        <div className="flex items-center justify-between px-10 py-4">
          {/* Sol grup */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
              Menü
            </h1>
          </div>

          {/* Sağ grup (müşteri info) */}
          <div className="flex items-center gap-3 cursor-default">
            <MdRestaurantMenu className="text-[#f5f5f5] text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-sm text-[#f5f5f5] font-semibold leading-4">
                {customerData.customerName || "Musteri ismi"}
              </h1>
              <h1 className="text-xs text-[#ababab] leading-4">
                {customerData.tableNo || "N/A"} 
              </h1>
            </div>
          </div>
        </div>

        {/* Kategori kartları + seçilen kategorinin ürünleri */}
        <MenuContainer />
      </div>

      {/* Sağ alan (sipariş/özet paneli) */}
      <div className="flex-[1] bg-[#1e1e2f] mt-4 mr-3 h-[780px] rounded-lg pt-2" > 
  {/* Müşteri Bilgisi */}
  <CustomerInfo/>

<hr className="border-[#2a2a2a] border-t-2" />
{/* Cart Items */}

 <CartInfo/>
<hr className="border-[#2a2a2a] border-t-2" />
<Bill/>

</div>

      

      <BottomNav />
    </section>
  );
};

export default Menu;

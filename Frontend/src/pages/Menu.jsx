// src/pages/Menu.jsx
import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";

const Menu = () => {
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
              <span className="text-sm text-[#f5f5f5] font-semibold leading-4">
                Müşteri Adı
              </span>
              <span className="text-xs text-[#ababab] leading-4">
                Masa No: 2
              </span>
            </div>
          </div>
        </div>

        {/* Kategori kartları + seçilen kategorinin ürünleri */}
        <MenuContainer />
      </div>

      {/* Sağ alan (sipariş/özet paneli) */}
      <div className="flex-[2] bg-[#2b5cff] rounded-l-2xl" />

      <BottomNav />
    </section>
  );
};

export default Menu;

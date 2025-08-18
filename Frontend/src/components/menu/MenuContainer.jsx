import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);

  return (
    <>
      {/* KATEGORİLER */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => setSelected(menu)}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && <GrRadialSelected size={20} color="#fff" />}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {menu.items.length} Ögeler
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* SEÇİLEN KATEGORİ ÖĞELERİ */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {selected?.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
          >
            {/* Sol: Görsel */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-14 h-14 rounded-md bg-[#333] grid place-items-center text-xl">
                🍽️
              </div>
            )}

            {/* Orta: İsim */}
            <div className="flex-1">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {item.name}
              </h1>
            </div>

            {/* Sağ: Fiyat */}
            <p className="text-[#f5f5f5] text-xl font-bold">₺{item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;

import React from "react";

const Bill = () => {
  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Ürünler (4)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₺240</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Vergi (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₺24</h1>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
      <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">
    Nakit
  </button>
  <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">
    Kart
  </button>
</div>

{/* Sipariş Ver Butonu */}
<div className="px-5 mt-4">
  <button className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-bold text-lg">
    Sipariş Ver
  </button>
        
      </div>
    </>
  );
};

export default Bill;

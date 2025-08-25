import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";

const Bill = () => {
  const cartData = useSelector(state => state.cart);
  const total = useSelector(getTotalPrice);

  const [show, setShow] = useState(false);

  const handleOrder = () => {
    setShow(true);

    // 3 saniye sonra kapanacak
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Ürünler ({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₺{total.toFixed(2)}
        </h1>
      </div>

      {/* Sipariş Ver Butonu */}
      <div className="px-5 mt-4">
        <button
          onClick={handleOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-bold text-lg"
        >
          Sipariş Ver
        </button>
      </div>

      {/* Bildirim */}
      {show && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Ödeme kasada yapılacaktır, siparişiniz alındı ✅
        </div>
      )}
    </>
  );
};

export default Bill;

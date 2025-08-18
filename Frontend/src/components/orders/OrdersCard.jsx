import React from 'react'
import { FaCheckDouble, FaCircle } from 'react-icons/fa'

const OrdersCard = () => {
  return (
    <div className="w-[500px] bg-[#1e1e2f] text-amber-50 p-4 rounded-lg space-y-3">
      {/* ÜST: avatar + müşteri + durum */}
      <div className="flex gap-4">
        <button className="bg-[#f6b100] px-3 py-1 text-xl font-bold rounded-lg">EN</button>

        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-wide">Yönetici</h1>
            <p className="text-[#ababab] text-sm">#101 /Yemeğini Yiyor</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="bg-green-600 bg-emerald-700 px-2 py-1 rounded-lg">
              <FaCheckDouble className="inline mr-2" />
              Hazır
            </p>
            <p className="text-[#ababab] text-sm">
              <FaCircle className="inline mr-2 text-green-600" />
              Servisi Hazır
            </p>
          </div>
        </div>
      </div>

      {/* ORTA: tarih / sipariş sayısı */}
      <div className="flex justify-between items-center text-[#ababab] text-sm">
        <p>Ağustos 15, 2025 14:30 PM</p>
        <p>8 Sipariş</p>
      </div>

      {/* AYIRICI */}
      <div className="border-t border-gray-700" />

      {/* ALT: toplam */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-[#ababab] text-xl font-semibold">Toplam</h1>
        <p className="text-lg font-semibold">₺150,00</p>
      </div>
    </div>
  )
}

export default OrdersCard

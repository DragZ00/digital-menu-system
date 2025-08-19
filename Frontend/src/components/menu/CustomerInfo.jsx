import React from 'react'

const CustomerInfo = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
  <div className="flex flex-col items-start">
    <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
      Müşteri Adı
    </h1>
    <p className="text-xs text-[#ababab] font-medium mt-1">
      #101 / Restoranda
    </p>
    <p className="text-xs text-[#ababab] font-medium mt-2">
      19 Ocak 2025 17:34
    </p>
  </div>

  <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
    MA
  </button>
</div>
  )
}

export default CustomerInfo
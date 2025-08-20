import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const [dateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);

  return (
    // iki uca yay + yukarı hizala
    <div className="flex justify-between items-start px-4 py-3 w-full">
      {/* SOL: bilgiler */}
      <div className="flex flex-col">
        <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
          {customerData.customerName || "Musteri ismi"}
        </h1>
        <p className="text-xs text-[#ababab] font-medium mt-1">
          {customerData.orderId || "N/A"} / Restoranda
        </p>
        <p className="text-xs text-[#ababab] font-medium mt-2">
          {formatDate(dateTime)}
        </p>
      </div>

      {/* SAĞ: avatar */}
      <button
        className="bg-[#f6b100] w-12 h-12 rounded-lg text-black text-xl font-bold grid place-items-center self-start"
        title={customerData.customerName || "Müşteri"}
      >
        {getAvatarName(customerData.customerName) || "CN"}
      </button>
    </div>
  );
};

export default CustomerInfo;

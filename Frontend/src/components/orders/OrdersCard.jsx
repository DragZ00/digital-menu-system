import React from "react";
import { FaCircle, FaTrashAlt } from "react-icons/fa";

const fmtTL = (n = 0) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" })
    .format(Number(n) || 0);

const STATUS_OPTIONS = [
  { ui: "Devam etmekte", color: "bg-yellow-500", dot: "text-yellow-400" },
  { ui: "Hazır",          color: "bg-green-600",  dot: "text-green-400" },
  { ui: "Tamamlanan",     color: "bg-blue-600",   dot: "text-blue-400" },
];

const OrdersCard = ({
  customerName = "Müşteri",
  tableNo = "#?",
  subtitle = "Yemeğini Yiyor",
  status = "Devam etmekte",
  onStatusChange,
  onDelete,                 // ✅ parent'tan gelecek
  dateText = "",
  itemsCount = 0,
  total = 0,
  pending = false,
  deleting = false,         // ✅ opsiyonel: disable state
}) => {
  return (
    <div className="flex-none w-[420px] bg-[#1e1e2f] text-amber-50 p-4 rounded-lg space-y-3 min-h-[200px]">
      {/* ÜST */}
      <div className="flex gap-4">
        <button className="bg-[#f6b100] min-w-12 h-10 px-3 py-1 text-xl font-bold rounded-lg flex items-center justify-center">
          {(customerName?.trim()?.slice(0, 2) || "MU").toUpperCase()}
        </button>

        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-wide line-clamp-1">
              {customerName}
            </h1>
            <p className="text-[#ababab] text-sm">#{tableNo} / {subtitle}</p>
          </div>

          {/* Status Button Group + Delete */}
          <div className="flex items-center gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.ui}
                disabled={pending || deleting}
                onClick={() => onStatusChange?.(opt.ui)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  status === opt.ui
                    ? opt.color + " text-white"
                    : "bg-[#2a2a2a] text-[#ababab] hover:bg-[#383838]"
                }`}
              >
                {opt.ui}
              </button>
            ))}

            {/* ✅ Sil butonu */}
            <button
              title="Siparişi sil"
              aria-label="Siparişi sil"
              disabled={pending || deleting}
              onClick={onDelete}
              className={`ml-2 p-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 ${
                deleting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <FaTrashAlt size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ORTA */}
      <div className="flex justify-between items-center text-[#ababab] text-sm">
        <p>{dateText || "—"}</p>
        <p>{itemsCount} Sipariş</p>
      </div>

      {/* AYIRICI */}
      <div className="border-t border-gray-700" />

      {/* ALT */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-[#ababab] text-xl font-semibold flex items-center gap-2">
          <FaCircle
            className={
              status === "Hazır"
                ? "text-green-500"
                : status === "Tamamlanan"
                ? "text-blue-400"
                : "text-yellow-400"
            }
          />
          Toplam
        </h1>
        <p className="text-lg font-semibold">{fmtTL(total)}</p>
      </div>
    </div>
  );
};

export default OrdersCard;

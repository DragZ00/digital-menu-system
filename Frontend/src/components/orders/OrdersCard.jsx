// src/components/orders/OrdersCard.jsx
import React, { useState, useMemo } from "react";
import { FaCircle, FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const fmtTL = (n = 0) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" })
  .format(Number(n) || 0);

const STATUS_OPTIONS = [
  { ui: "Devam etmekte", color: "bg-yellow-500", dot: "text-yellow-400" },
  { ui: "Hazır",          color: "bg-green-600",  dot: "text-green-400" },
  { ui: "Tamamlanan",     color: "bg-blue-600",   dot: "text-blue-400" },
];

export default function OrdersCard({
  customerName = "Müşteri",
  tableNo = "#?",
  subtitle = "Yemeğini Yiyor",
  status = "Devam etmekte",
  dateText = "",
  itemsCount = 0,
  total = 0,
  items = [],                // ✅ yeni
  onStatusChange,
  onDelete,
  pending = false,
  deleting = false,
}) {
  const [open, setOpen] = useState(true); // detaylar açık/kapalı

  // Güvenli normalize: farklı şemalar için
  const normalized = useMemo(() => {
    return (items || []).map((it) => ({
      name: it?.name || it?.product?.name || "-",
      qty: it?.qty ?? it?.quantity ?? 1,
      price: Number(it?.price ?? it?.product?.price ?? 0),
    }));
  }, [items]);

  const lineSum = (it) => (Number(it.qty) || 0) * (Number(it.price) || 0);
  const calcTotal = useMemo(
    () => normalized.reduce((acc, it) => acc + lineSum(it), 0),
    [normalized]
  );

  const isReady = (status || "").toLowerCase() === "hazır";

  return (
    <div className="w-full sm:w-[420px] lg:w-[480px] bg-[#1e1e2f] text-amber-50 p-4 rounded-lg space-y-3">
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
            {dateText && <p className="text-[#6f6f6f] text-xs">{dateText}</p>}
          </div>

          <div className="flex items-center gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.ui}
                disabled={pending || deleting}
                onClick={() => onStatusChange?.(opt.ui)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition 
                  ${status === opt.ui ? opt.color + " text-white" : "bg-[#2a2a2a] text-[#ababab] hover:bg-[#383838]"}`}
              >
                {opt.ui}
              </button>
            ))}

            {onDelete && (
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
            )}
          </div>
        </div>
      </div>

      {/* DETAY BAŞLIK */}
      <div className="flex items-center justify-between text-[#ababab] text-sm">
        <p>{itemsCount} ürün</p>
        <button
          className="flex items-center gap-1 text-xs bg-[#2a2a2a] hover:bg-[#383838] px-2 py-1 rounded"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaChevronUp /> : <FaChevronDown />} Detay
        </button>
      </div>

      {/* ÜRÜN LİSTESİ */}
      {open && (
        <div className="rounded-lg bg-[#141722] border border-[#2d3246]">
          <ul className="divide-y divide-[#2d3246]">
            {normalized.map((it, i) => (
              <li key={i} className="flex items-center justify-between px-3 py-2">
                <span className="text-sm">
                  <span className="text-[#f6b100] font-semibold mr-1">{it.qty}×</span>
                  {it.name}
                </span>
                <span className="text-sm text-[#d8d8d8]">{fmtTL(lineSum(it))}</span>
              </li>
            ))}
            {normalized.length === 0 && (
              <li className="px-3 py-2 text-sm text-[#8b8b8b]">Ürün bulunamadı.</li>
            )}
          </ul>
        </div>
      )}

      {/* ALT TOPLAM */}
      <div className="flex justify-between items-center mt-2">
        <h1 className="text-[#ababab] text-xl font-semibold flex items-center gap-2">
          <FaCircle className={isReady ? "text-green-500" : "text-blue-400"} />
          Toplam
        </h1>
        <p className="text-lg font-semibold">
          {fmtTL(total || calcTotal)}
        </p>
      </div>
    </div>
  );
}

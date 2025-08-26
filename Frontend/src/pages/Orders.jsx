import React, { useState } from "react";
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import BottomNav from "../components/shared/BottomNav";
import OrdersCard from "../components/orders/OrdersCard";
import BackButton from "../components/shared/BackButton";
import { getOrders, updateOrder, deleteOrder } from "../https"; 
import { FaTrashAlt } from "react-icons/fa";

const mapToUi = (raw = "") => {
  const v = raw.toLowerCase();
  if (v === "pending" || v === "preparing") return "Devam etmekte";
  if (v === "ready") return "Hazır";
  if (v === "completed" || v === "done") return "Tamamlanan";
  return "Devam etmekte";
};

const mapToBackend = (ui = "") => {
  const v = ui.toLowerCase();
  if (v === "devam etmekte") return "pending";
  if (v === "hazır") return "ready";
  if (v === "tamamlanan") return "completed";
  return "pending";
};

const fmtDate = (str) => {
  try {
    const d = new Date(str);
    return d.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const uiTabs = ["Hepsi", "Devam etmekte", "Hazır", "Tamamlanan"];

const Orders = () => {
  const [status, setStatus] = useState("Hepsi");

  // ✔️ siparişleri çek
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await getOrders()).data, // { success, data: [...] }
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  });

  const orders = data?.data ?? [];

  // ✔️ filtre
  const filtered =
    status === "Hepsi"
      ? orders
      : orders.filter(
          (o) => mapToUi(o?.orderStatus).toLowerCase() === status.toLowerCase()
        );

  // ✔️ durum güncelleme
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, next }) => updateOrder(id, { orderStatus: next }),
    onSuccess: () => {
      enqueueSnackbar("Durum güncellendi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      enqueueSnackbar(err?.response?.data?.message || "Güncelleme başarısız!", { variant: "error" });
    },
  });

  const deleteMut = useMutation({
   mutationFn: (id) => deleteOrder(id),
       onSuccess: () => {
      enqueueSnackbar("Sipariş silindi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
     enqueueSnackbar(err?.response?.data?.message || "Silme başarısız!", { variant: "error" });
    },
 });
  const handleDelete = (id) => {
    if (!id) return;
   if (confirm("Bu siparişi silmek istediğinize emin misiniz?")) {
      deleteMut.mutate(id);
    }  };

  const handleStatusChange = (id, uiVal) => {
    mutation.mutate({ id, next: mapToBackend(uiVal) });
  };

  return (
    <section className="bg-cyan-900 h-[calc(100vh-5rem)] overflow-hidden">
      {/* ÜST BAR */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-xl font-bold tracking-wide">Siparişler</h1>
        </div>

        <div className="flex items-center justify-around gap-2 sm:gap-4">
          {uiTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`text-[#ababab] text-sm sm:text-lg rounded-lg px-3 sm:px-5 py-2 font-semibold ${
                status === tab ? "bg-[#383838]" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LİSTE */}
    <div className="flex flex-wrap gap-6 px-6 md:px-16 py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-10rem)] items-start content-start justify-start">
        {isLoading && <p className="text-white/80 text-sm">Yükleniyor…</p>}
        {isError && <p className="text-red-300 text-sm">Siparişler getirilemedi. Lütfen tekrar deneyin.</p>}

        {!isLoading &&
          filtered.map((o) => (
            <OrdersCard
              key={o._id}
              orderId={o._id}
              customerName={o?.customerDetails?.name || "Müşteri"}
              tableNo={o?.table?.tableNo || o?.tableNo || o?.table || "?"}
              subtitle="Yemeğini Yiyor"
              status={mapToUi(o?.orderStatus)}
              onStatusChange={(uiVal) => handleStatusChange(o._id, uiVal)}
              onDelete={() => handleDelete(o._id)}
              dateText={fmtDate(o?.createdAt)}
              itemsCount={o?.orderItems?.length || 0}
              total={o?.bills?.totalwithtax ?? o?.bills?.total ?? 0}
              pending={mutation.isLoading && mutation.variables?.id === o._id}
              deleting={deleteMut.isLoading && deleteMut.variables === o._id}
            />
          ))}

        {!isLoading && !isError && filtered.length === 0 && (
          <p className="text-white/70 text-sm">Bu kriterde sipariş bulunamadı.</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;

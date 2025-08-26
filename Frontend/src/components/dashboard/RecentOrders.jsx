import React from "react";
import { GrUpdate } from "react-icons/gr";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrder } from "../../https";

const fmtDate = (str) => {
  try {
    const d = new Date(str);
    return d.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const fmtTL = (n = 0) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(Number(n) || 0);

// Backend ↔ UI durum eşleme
const toUI = (raw = "") => {
  const v = raw.toLowerCase();
  if (v === "pending" || v === "preparing" || v === "in progress") return "In Progress";
  if (v === "ready") return "Ready";
  if (v === "completed" || v === "done") return "Completed";
  return "In Progress";
};
const toBackend = (ui = "") => {
  const v = ui.toLowerCase();
  if (v === "in progress") return "pending";
  if (v === "ready") return "ready";
  if (v === "completed") return "completed";
  return "pending";
};

const RecentOrders = () => {
  const qc = useQueryClient();

  // Siparişleri çek
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: async () => (await getOrders()).data, // { success, data: [...] }
    placeholderData: keepPreviousData,
    refetchInterval: 10000, // 10 sn'de bir otomatik yenile (istersen kaldır)
  });

  const orders = data?.data ?? [];

  // Durum güncelleme mutation
  const mutation = useMutation({
    mutationFn: ({ id, next }) => updateOrder(id, { orderStatus: next }),
    onSuccess: () => {
      enqueueSnackbar("Sipariş durumu güncellendi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["recent-orders"] });
    },
    onError: (err) => {
      enqueueSnackbar(err?.response?.data?.message || "Güncelleme başarısız!", { variant: "error" });
    },
  });

  const handleStatusChange = (orderId, uiValue) => {
    const next = toBackend(uiValue);
    mutation.mutate({ id: orderId, next });
  };

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#f5f5f5] text-xl font-semibold">Son Siparişler</h2>
        <button
          onClick={() => refetch()}
          className="text-blue-300 hover:text-blue-200"
          title="Yenile"
        >
          <GrUpdate className={isFetching ? "animate-spin" : ""} size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Sipariş No</th>
              <th className="p-3">Müşteri</th>
              <th className="p-3">Durum</th>
              <th className="p-3">Tarih & Saat</th>
              <th className="p-3">Ürün Sayısı</th>
              <th className="p-3">Masa No</th>
              <th className="p-3">Toplam</th>
              <th className="p-3 text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-white/70">
                  Yükleniyor…
                </td>
              </tr>
            )}

            {!isLoading && isError && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-red-300">
                  Siparişler alınamadı.
                </td>
              </tr>
            )}

            {!isLoading && !isError && orders.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-white/60">
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}

            {orders.map((o, index) => {
              const orderNo = o?.orderNo || o?._id?.slice(-6) || 100 + index;
              const uiStatus = toUI(o?.orderStatus);
              const itemsCount = o?.orderItems?.length || 0;
              const masaNo = o?.table?.tableNo || o?.table || "?";
              const toplam = o?.bills?.totalwithtax ?? o?.bills?.total ?? 0;

              return (
                <tr key={o._id} className="border-b border-gray-600 hover:bg-[#333]">
                  <td className="p-4">{orderNo}</td>
                  <td className="p-4">{o?.customerDetails?.name || "Müşteri"}</td>

                  <td className="p-4">
                    <select
                      className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-600 rounded px-2 py-1 ${
                        uiStatus === "Ready" ? "text-green-500" :
                        uiStatus === "Completed" ? "text-blue-400" :
                        "text-yellow-500"
                      }`}
                      value={uiStatus}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    >
                      <option className="text-yellow-500" value="In Progress">Hazırlanıyor</option>
                      <option className="text-green-500" value="Ready">Hazır</option>
                      <option className="text-blue-400" value="Completed">Tamamlanan</option>
                    </select>
                  </td>

                  <td className="p-4">{fmtDate(o?.createdAt)}</td>
                  <td className="p-4">{itemsCount} Ürün</td>
                  <td className="p-4">Masa {masaNo}</td>
                  <td className="p-4">{fmtTL(toplam)}</td>

                  <td className="p-4 text-center">
                    <button
                      className="text-blue-400 hover:text-blue-500 transition"
                      onClick={() => refetch()}
                      title="Yenile"
                    >
                      <GrUpdate size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;

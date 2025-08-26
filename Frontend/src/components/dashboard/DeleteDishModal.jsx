import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getDishes, deleteDish } from "../../https";
import { enqueueSnackbar } from "notistack";

const DeleteDishModal = ({ setOpen }) => {
  const qc = useQueryClient();
  const [dishId, setDishId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => (await getDishes()).data, // {success, data:[{_id,name,category,price}]}
    placeholderData: keepPreviousData,
  });
  const dishes = data?.data ?? [];

  const mut = useMutation({
    mutationFn: (id) => deleteDish(id),
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message || "Yemek silindi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["dishes"] });
      setOpen(false);
    },
    onError: (err) => {
      enqueueSnackbar(err?.response?.data?.message || "Silme başarısız!", { variant: "error" });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!dishId) {
      enqueueSnackbar("Lütfen bir yemek seçin.", { variant: "warning" });
      return;
    }
    if (confirm("Bu yemeği silmek istediğinize emin misiniz?")) {
      mut.mutate(dishId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-[420px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Yemek Çıkar</h2>
          <button onClick={() => setOpen(false)} className="text-[#f5f5f5] hover:text-red-500">
            <IoMdClose size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-[#ababab] text-sm">Yemek Seçin</label>
          <div className="bg-[#1f1f1f] rounded-lg p-3">
            <select
              className="w-full bg-[#1f1f1f] text-yellow-400 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
              value={dishId}
              onChange={(e) => setDishId(e.target.value)}
            >
              <option value="">— Yemek seçin —</option>
              {isLoading ? (
                <option>Yükleniyor…</option>
              ) : (
                dishes.map((d) => (
                  <option
                    key={d._id}
                    value={d._id}
                    className="bg-[#1f1f1f] text-yellow-400"
                  >
                    {d.name} — ₺{Number(d.price).toFixed(2)}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="submit"
            disabled={mut.isLoading}
            className={`w-full rounded-lg mt-4 py-3 text-lg font-bold text-white ${
              mut.isLoading ? "bg-red-500/70" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {mut.isLoading ? "Siliniyor…" : "Yemeği Sil"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DeleteDishModal;

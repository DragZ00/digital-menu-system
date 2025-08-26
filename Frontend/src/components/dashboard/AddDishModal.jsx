import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getCategories, addDish } from "../../https";
import { enqueueSnackbar } from "notistack";

const AddDishModal = ({ setOpen }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", category: "", price: "" });

  // Kategorileri çek
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategories()).data, // axios: { success, data:[...] } bekleriz
    placeholderData: keepPreviousData,
  });

  // Çeşitli response şekillerini normalize et
  const raw = data?.data ?? data;
  const categories = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
    ? raw.data
    : [];

  const mut = useMutation({
    mutationFn: (body) => addDish(body),
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message || "Yemek eklendi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["dishes"] });
      setOpen(false);
    },
    onError: (err) => {
      enqueueSnackbar(err?.response?.data?.message || "Yemek eklenemedi!", { variant: "error" });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.category || !form.price) {
      enqueueSnackbar("Lütfen tüm alanları doldurun.", { variant: "warning" });
      return;
    }
    mut.mutate({
      name: form.name.trim(),
      category: form.category,        // ObjectId (Category)
      price: Number(form.price),
    });
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
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Yemek Ekle</h2>
          <button onClick={() => setOpen(false)} className="text-[#f5f5f5] hover:text-red-500">
            <IoMdClose size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Ad */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm">Yemek Adı</label>
            <div className="bg-[#1f1f1f] rounded-lg p-3">
              <input
                className="bg-transparent text-white w-full focus:outline-none"
                placeholder="Örn. Adana Kebap"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm">Kategori</label>
            <div className="bg-[#1f1f1f] rounded-lg p-3">
             <select
                  className="w-full bg-[#1f1f1f] text-yellow-400 px-2 py-2 rounded-lg"
                  value={form.category}
                  onChange={(e) => setForm(s => ({ ...s, category: e.target.value }))}
                  disabled={isLoading || isError || categories.length === 0}
                >
                  <option value="">
                    {isLoading ? "Yükleniyor…" : isError ? "Hata oluştu" : "Önce kategori ekleyin"}
                  </option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
            </div>
          </div>

          {/* Fiyat */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm">Fiyat (₺)</label>
            <div className="bg-[#1f1f1f] rounded-lg p-3">
              <input
                type="number"
                min="0"
                step="0.01"
                className="bg-transparent text-white w-full focus:outline-none"
                placeholder="Örn. 120"
                value={form.price}
                onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
              />
            </div>
          </div>

          {/* Kaydet */}
          <button
            type="submit"
            disabled={mut.isLoading}
            className={`w-full rounded-lg mt-4 py-3 text-lg font-bold text-[#1f1f1f] ${
              mut.isLoading ? "bg-yellow-300/60" : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {mut.isLoading ? "Kaydediliyor…" : "Yemek Ekle"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDishModal;

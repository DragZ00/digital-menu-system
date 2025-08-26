import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { getTables, deleteTable } from '../../https';
import { enqueueSnackbar } from 'notistack';

const DeleteTableModal = ({ setOpen }) => {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState("");

  // Masaları çekip dropdown’da göstereceğiz
   const { data, isLoading, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => (await getTables()).data, // axios => { success, data: [...] } bekliyoruz
    placeholderData: keepPreviousData,
  });

  // API farklı şekillerde dönerse hepsini karşıla:
  // 1) { data: [...] }
  // 2) { success:true, data:[...] }
  // 3) { data: { docs:[...] } }  (sayfalama gibi)
  const raw = data?.data ?? data; 
  const tables = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
    ? raw.data
    : Array.isArray(raw?.docs)
    ? raw.docs
   : [];



  const delMut = useMutation({
    mutationFn: (id) => deleteTable(id),
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message || "Masa silindi.", { variant: "success" });
      qc.invalidateQueries({ queryKey: ["tables"] });
      setOpen(false);
    },
    onError: (err) => {
      enqueueSnackbar(err?.response?.data?.message || "Silme başarısız!", { variant: "error" });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) {
      enqueueSnackbar("Lütfen bir masa seçin.", { variant: "warning" });
      return;
    }
    if (confirm("Bu masayı silmek istediğinize emin misiniz?")) {
      delMut.mutate(selectedId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Masa Çıkar</h2>
          <button onClick={() => setOpen(false)} className="text-[#f5f5f5] hover:text-red-500">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-[#ababab] text-sm font-medium">Masa Seçin</label>
          <div className="rounded-lg bg-[#1f1f1f] p-3">
            <select
              className="w-full bg-[#1f1f1f] text-amber-300   focus:outline-none"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">
                {isLoading ? "Yükleniyor…" : isError ? "Hata oluştu" : "— Masa seçin —"}
              </option>
              {Array.isArray(tables) && tables.map((t) => (
                <option key={t._id} value={t._id}>
                  Masa {t.tableNo} {t.seats ? `(${t.seats} koltuk)` : ""}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={delMut.isLoading}
            className={`w-full rounded-lg mt-4 py-3 text-lg font-bold
              ${delMut.isLoading ? "bg-red-400/60 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}
              text-white`}
          >
            {delMut.isLoading ? "Siliniyor..." : "Masa Çıkar"}
          </button>
        </form>
      </motion.div>
    </div>  
  );
};

export default DeleteTableModal;

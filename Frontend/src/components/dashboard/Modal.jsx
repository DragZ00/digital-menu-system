import React,{useState} from 'react'
import { motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { addTable } from "../../https";
import { enqueueSnackbar } from "notistack"

const Modal = ({setIsTableModalOpen}) => {
    const [tableData, setTableData] = useState({
    tableNo: "",
    seats: ""
  });

  // Input değişimlerini yakalama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tableData);
    // Buraya veri gönderme veya başka işlemler eklenebilir
    tableMutation.mutate(tableData);
  };

  const handleCloseModal = () => {
    
    setIsTableModalOpen(false);
  };
const tableMutation = useMutation({
  mutationFn: (reqData) => addTable(reqData),
  onSuccess: (res) => {
        setIsTableModalOpen(false);
        const { data } = res;
        enqueueSnackbar(data.message, { variant: "success" })
  },
  onError: (error) => {
    const { data } = error.response;
    enqueueSnackbar(data.message, { variant: "error" })
    console.log(error);
  }
});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Masa Ekle</h2>
          <button
            onClick={handleCloseModal}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>
 <form  onSubmit = {handleSubmit} className="space-y-4 mt-10">
  <div>
    {/* Etiket (Label) */}
    <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
      Masa Numarası
    </label>

    {/* Giriş Kutusu (Input) */}
    <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
      <input
        type="number"
        name="tableNo"
        value={tableData.tableNo}
        onChange={handleInputChange}
        className="bg-transparent flex-1 text-white focus:outline-none"
        required
        placeholder="Masa numarasını giriniz"
      />
    </div>
  </div>

  <div>
  {/* Etiket */}
  <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
    Koltuk Sayısı
  </label>

  {/* Giriş Kutusu */}
  <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
    <input
      type="number"
      name="seats"
        value={tableData.seats}
        onChange={handleInputChange}
      className="bg-transparent flex-1 text-white focus:outline-none"
      required
      placeholder="Koltuk sayısını giriniz"
    />
  </div>
</div>
<button
  type="submit"
  className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
>
  Masa Ekle
</button>


</form>

      </motion.div>
    </div>
  );
};

export default Modal;

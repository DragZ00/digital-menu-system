import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../https";
import { useSnackbar } from "notistack";




const Register = ({setIsRegister}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  // input değişikliklerini yönetir
  const handleChange = (e) => {
    const value =
      e.target.name === "phone"
        ? e.target.value.replace(/\D/g, "") // sadece rakamları al
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  // role seçim butonları
  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  // mutation tanımı
  const registerMutation = useMutation({
    mutationFn: (reqData) => register({
      ...reqData,
      phone: Number(reqData.phone) // backend number olarak bekliyor
    }),
    onSuccess: (res) => {
      enqueueSnackbar("Kayıt başarılı!", { variant: "success" });
      console.log("✅ Kayıt:", res.data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
      });

    setTimeout(() => {
        setIsRegister(false); // kayıt başarılıysa giriş sayfasına yönlendir
      },1500)


    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        "Kayıt sırasında bir hata oluştu!";
      enqueueSnackbar(msg, { variant: "error" });
      console.error("❌ Hata:", error);
    }
  });

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // phone validation (10 haneli)
    if (formData.phone.length !== 10) {
      enqueueSnackbar("Telefon numarası 10 haneli olmalıdır!", {
        variant: "error"
      });
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Çalışan Adı */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Çalışan Adı
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Çalışan adını giriniz"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* E-posta */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Çalışan E-posta
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Çalışan e-postasını giriniz"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Çalışan Telefon
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Örn: 5321234567"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Şifre */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Şifre
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifre giriniz"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Rol Seçimi */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Rolünüzü Seçin
          </label>
          <div className="flex items-center gap-3 mt-4">
            {["Garson", "Kasiyer", "Yönetici"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${
                  formData.role === role ? "bg-indigo-700 text-white" : ""
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Kaydol Butonu */}
        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",         // name
    email: "",      // email
    phone: "",    // phone
    password: "",      // password
    role: ""         // role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Formdaki Türkçe alanlar buraya düşer
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Çalışan Adı */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Çalışan Adı
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
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

        {/* Çalışan E-posta */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Çalışan E-posta
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
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

        {/* Çalışan Telefon */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Çalışan Telefon
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Çalışan telefonunu giriniz"
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
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
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
          <div className="flex item-center gap-3 mt-4">
            {["Garson", "Kasiyer", "Yönetici"].map((role) => {
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelection(role)}
                  className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] 
                  ${formData.role === role ? "bg-indigo-700 text-white" : ""}`}
                >
                  {role}
                </button>
              );
            })}
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

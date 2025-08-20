import React,{useState} from "react";

const Login = () => {
    
        const [formData, setFormData] = useState({

      email: "",      // email
      password: "",      // password
      
    });
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData); // Formdaki Türkçe alanlar buraya düşer
    };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              placeholder="Şifrenizi giriniz"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Giriş Yap Butonu */}
        <button
          type="submit"
          className="w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;

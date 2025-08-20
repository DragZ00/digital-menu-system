import React,{useState} from "react";
import restaurant from "../assets/images/restaurant.jpg";

import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";



const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
  return ( 
    <div className="flex min-h-screen w-full">
        {/* Sol Alan */}
        <div className="w-1/2 relative flex items-center justify-center bg-cover">
          {/* Arka Plan Resmi */}
          <img
            className="w-full h-full object-cover"
            src={restaurant}
            alt="Restoran Görseli"
          />

          {/* Siyah Katman */}
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>

          {/* Alt Kısımda Alıntı */}
          <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
            "Müşterilere en iyi yemeği, hızlı ve güler yüzlü hizmetle sunarsanız
            sıcak bir ortamda, onlar tekrar gelmeye devam edecektir."
            <br />
            <span className="block mt-4 text-yellow-400">
              - Resturant Kurucusu
            </span>
          </blockquote>
        </div>

        {/* Sağ Alan */}
        <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
    <div className="flex flex-col items-center gap-2">
      <img
        src={logo}
        alt="Restro Logosu"
        className="h-14 w-14 border-2 rounded-full p-1"
      />
      <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
        Restro
      </h1>
    </div>

  <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
    {isRegister ? "Çalışan Kaydı" : "Çalışan Girişi"}
  </h2>
  {/* Bileşenler */}
  {isRegister ? <Register /> : <Login />}


 <div className="flex justify-center mt-6">
  <p className="text-sm text-[#ababab]">
    {isRegister ? "Zaten bir hesabınız var mı?" : "Hesabınız yok mu?"}{" "}
    <button
      onClick={() => setIsRegister(!isRegister)}
      className="text-yellow-400 font-semibold hover:underline"
      type="button"
    >
      {isRegister ? "Giriş Yap" : "Kayıt Ol"}
    </button>
  </p>
</div>


  </div>
      </div>
       
  )
}


export default Auth;

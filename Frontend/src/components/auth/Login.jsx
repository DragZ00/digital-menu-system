import React,{useState} from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https";
import { Navigate, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";


const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
        const navigate = useNavigate();
        const dispatch = useDispatch();
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
      loginMutation.mutate(formData); // API çağrısı için form verilerini gönder
    };
    

    const loginMutation = useMutation({
      mutationFn: (reqData) => login(reqData),
      onSuccess: (res) => {
        const { data } = res;
        console.log(data);

        const { _id, name, email, phone, role } = data.data;
        dispatch(setUser({ _id, name, email, phone, role }));

        navigate("/"); // Başarılı giriş sonrası yönlendirme
        // Burada başarılı giriş sonrası yapılacak işlemler
      },
      onError: (error) => {
        const { response } = error;
        enqueueSnackbar(response.data.message, {
          variant: "error",
        }); 
        
      }
    });


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

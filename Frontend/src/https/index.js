import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");
export const addTable = (data)=> api.post("/api/table/",data);
export const getTables = () => api.get("/api/table");
export const createOrder = (data) => api.post("/api/order", data);


export const getOrders = (status) =>
  api.get("/api/order", { params: status ? { status } : {} });
export const updateOrder = (id, data) =>
  api.put(`/api/order/${id}`, data);  
export const deleteOrder = (id) => api.delete(`/api/order/${id}`);
export const deleteTable = (id) => api.delete(`/api/table/${id}`);
export const getCategories = () => api.get("/api/category");

export const getDishes   = () => api.get("/api/dish");
export const addDish     = (data) => api.post("/api/dish", data);
export const deleteDish  = (id) => api.delete(`/api/dish/${id}`);

export const getDishesByCategory = (categoryId) =>
  api.get(`/api/dish?category=${categoryId}`);
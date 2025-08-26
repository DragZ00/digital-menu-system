import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCategories, getDishes } from "../../https";

const COLORS = [
  "bg-red-600", "bg-purple-600", "bg-pink-600", "bg-yellow-600",
  "bg-blue-600", "bg-green-600", "bg-indigo-600", "bg-orange-600"
];

const MenuContainer = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [quantities, setQuantities] = useState({});

  // API’den kategoriler
  const { data: catData, isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategories()).data,
    placeholderData: keepPreviousData,
  });

  const categories = catData?.data ?? [];

  // API’den yemekler
  const { data: dishData, isLoading: dishLoading } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => (await getDishes()).data,
    placeholderData: keepPreviousData,
  });

  const dishes = dishData?.data ?? [];

  // İlk kategori seçili olsun
  useEffect(() => {
    if (!selected && categories.length > 0) {
      setSelected(categories[0]._id);
    }
  }, [categories, selected]);

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 4),
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const count = quantities[item._id] || 0;
    if (count === 0) return;

    const lineId = `${item._id}-${Date.now()}`;

    dispatch(addItems({
      id: lineId,
      productId: item._id,
      name: item.name,
      pricePerQuantity: item.price,
      quantity: count,
      price: item.price * count,
    }));

    setQuantities((prev) => ({ ...prev, [item._id]: 0 }));
  };

  // Seçili kategorinin yemeklerini filtrele
  const filteredDishes = dishes.filter(
    (d) => d.category?._id === selected || d.category === selected
  );

  return (
    <>
      {/* KATEGORİLER */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {catLoading ? (
          <p className="text-white">Kategoriler yükleniyor...</p>
        ) : (
          categories.map((cat, idx) => (
            <div
              key={cat._id}
              className={`flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer ${COLORS[idx % COLORS.length]} ${selected === cat._id ? "ring-4 ring-yellow-400" : ""}`}
              onClick={() => setSelected(cat._id)}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-white text-lg font-semibold">{cat.name}</h1>
                {selected === cat._id && <GrRadialSelected size={20} color="#fff" />}
              </div>
              <p className="text-white/90 text-sm font-semibold">
                {dishes.filter((d) => d.category?._id === cat._id || d.category === cat._id).length} Ögeler
              </p>
            </div>
          ))
        )}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* ÜRÜNLER */}
      <div className="grid grid-cols-3 gap-4 px-10 py-4 w-full">
        {dishLoading ? (
          <p className="text-white">Yemekler yükleniyor...</p>
        ) : filteredDishes.length === 0 ? (
          <p className="text-white/80">Bu kategoride yemek yok.</p>
        ) : (
          filteredDishes.map((item) => {
            const count = quantities[item._id] || 0;
            return (
              <div
                key={item._id}
                className="flex flex-col justify-between p-4 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition-colors"
                style={{ height: "160px", minWidth: "250px" }}
              >
                {/* Üst Kısım */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-md bg-[#333] grid place-items-center text-xl">
                        🍽️
                      </div>
                    )}
                    <h1 className="text-white text-lg font-semibold">{item.name}</h1>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 text-white p-2 rounded-lg"
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>

                {/* Alt Kısım */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-white text-lg font-bold">₺{item.price}</p>
                  <div className="flex items-center bg-[#1f1f1f] px-3 py-1 rounded-lg">
                    <button
                      onClick={() => decrement(item._id)}
                      className="text-yellow-500 text-xl"
                    >
                      &minus;
                    </button>
                    <span className="text-white px-2">{count}</span>
                    <button
                      onClick={() => increment(item._id)}
                      className="text-yellow-500 text-xl"
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MenuContainer;

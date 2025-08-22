import React, { useState } from "react";
import { menus } from "../../constants";
import { FaShoppingCart } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(menus[0]);

  // Her ürün için ayrı sayaç: { [itemId]: number }
  const [quantities, setQuantities] = useState({});

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 4), // max 4
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const count = quantities[item.id] || 0;
    if (count === 0) return;

    // Satır için benzersiz id (silince sadece bu satır gitsin)
    const lineId = `${item.id}-${Date.now()}`;

    const payload = {
      id: lineId,                // ✅ doğru alan adı
      productId: item.id,        // (isteğe bağlı) ürün id'si
      name: item.name,
      pricePerQuantity: item.price, // birim fiyatı sakla
      quantity: count,              // adet
      price: item.price * count,    // satır toplamı (toplam hesapları için)
    };

    dispatch(addItems(payload));

    // Bu ürünün sayacını sıfırla
    setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <>
      {/* KATEGORİLER */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => {
              setSelected(menu);
            }}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected size={20} color="#fff" />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {menu.items.length} Ögeler
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* ÜRÜNLER */}
      <div className="grid grid-cols-3 gap-4 px-10 py-4 w-full">
        {selected?.items.map((item) => {
          const count = quantities[item.id] || 0;
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-4 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition-colors"
              style={{ height: "160px", minWidth: "250px" }}
            >
              {/* Üst Kısım: Görsel + İsim + Sepet */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-md object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-md bg-[#333] grid place-items-center text-xl">
                      🍽️
                    </div>
                  )}
                  <h1 className="text-[#f5f5f5] text-lg font-semibold">
                    {item.name}
                  </h1>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#02ca3a] text-white p-2 rounded-lg"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>

              {/* Alt Kısım: Fiyat + Adet Butonları */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-[#f5f5f5] text-lg font-bold">₺{item.price}</p>
                <div className="flex items-center bg-[#1f1f1f] px-3 py-1 rounded-lg">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-500 text-xl"
                  >
                    &minus;
                  </button>
                  <span className="text-white px-2">{count}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-500 text-xl"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;

import React, {  useState } from "react";
import { menus } from "../../constants";
import { FaShoppingCart } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
    const[itemCount,setItemCount] = useState(0);
  const [selected, setSelected] = useState(menus[0]);
  const[itemId, setItemId] = useState();
  const dispatch  = useDispatch();
    const increment = (id) => {
      setItemId(id);
    if(itemCount >=4)return;
    setItemCount((prev) => prev+1);
  }
  const decrement = (id) => {
    setItemId(id);
    if(itemCount <=0) return;
    setItemCount ((prev) => prev-1);
  }
  const handleAddToCart = (item) => {
    if(itemCount === 0 ) return;
    const {name,price} = item;
    const newObj = {ide: new Date(), name, pricePerQuantity: price, quantity:  
    itemCount, price: price * itemCount } 
    dispatch(addItems(newObj));
    setItemCount(0);
  }


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
               setItemId(0);
               setItemCount(0);

            }}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && <GrRadialSelected size={20} color="#fff" />}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {menu.items.length} Ögeler
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

    <div className="grid grid-cols-3 gap-4 px-10 py-4 w-full">
  {selected?.items.map((item) => (
    <div
      key={item.id}
      className="flex flex-col justify-between p-4 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition-colors"
      style={{ height: "160px", minWidth: "250px" }} // Boyut sabitleme
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
        <button onClick={() => handleAddToCart(item)} className="bg-[#02ca3a] text-white p-2 rounded-lg">
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
          <span className="text-white px-2">
            {item.id === itemId ? itemCount : "0"}
          </span>
          <button
            onClick={() => increment(item.id)}
            className="text-yellow-500 text-xl"
          >
            &#43;
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </>
  );
};

export default MenuContainer;

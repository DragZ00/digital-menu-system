import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPrice, clearCart } from "../../redux/slices/cartSlice";
import { createOrder } from "../../https";
import { enqueueSnackbar } from "notistack";

const TAX_RATE = 0; // %0. Vergi istiyorsan örn: 0.1 (%10) yap.

const Bill = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);          // [{id,name,price,qty}]
  const total = useSelector(getTotalPrice);                 // number
  const customer = useSelector((state) => state.customer);  // {customerName, customerPhone, guests, tableId, table, ...}

  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!cart?.length) {
      enqueueSnackbar("Sepet boş. Lütfen ürün ekleyin.", { variant: "warning" });
      return;
    }

    // 0 numaralı masa olasılığına karşı sadece undefined/null kontrolü
    if (customer?.tableId === undefined || customer?.tableId === null) {
      enqueueSnackbar("Masa bilgisi eksik (tableId). Lütfen masayı seçin.", { variant: "warning" });
      return;
    }

    const subtotal = Number(total.toFixed(2));
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const totalwithtax = Number((subtotal + tax).toFixed(2));

    const payload = {
      table: customer.tableId, // ✅ ObjectId (Mongo)
      orderItems: cart.map((c) => ({
        // productId şeman zorunluysa id veya _id gönder
        productId: c.id || c._id, 
        name: c.name,
        qty: c.qty ?? 1,
        price: c.price
      })),
      customerDetails: {
        name: customer.customerName || "Müşteri",
        phone: customer.customerPhone || "N/A",
        guests: Number(customer.guests || 1),
      },
      bills: {
        total: subtotal,
        tax,
        totalwithtax,
      },
      orderStatus: "pending",          // ✅ şemadaki zorunlu alan
      note: customer.note || "",
      // paymentType: "cash",          // şeman uygunsa aç
    };

    try {
      setPlacing(true);
      const { data } = await createOrder(payload);

      if (data?.success) {
        enqueueSnackbar(`Sipariş oluşturuldu! Ödemeyi kasaya yapınız.`, { variant: "success" });
        dispatch(clearCart());
        // navigate("/orders"); // istersen yönlendirme yap
      } else {
        enqueueSnackbar(data?.message || "Sipariş oluşturulamadı!", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || "Sunucu hatası!", { variant: "error" });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Ürünler ({cart.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₺{total.toFixed(2)}</h1>
      </div>

      <div className="px-5 mt-4 space-y-2">
        <button
          disabled={placing}
          onClick={handlePlaceOrder}
          className={`bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-bold text-lg ${
            placing ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {placing ? "Gönderiliyor..." : "Sipariş Ver"}
        </button>

        <p className="text-[11px] text-[#ababab] text-center">
          Ödeme kasada yapılacaktır.
        </p>
      </div>
    </>
  );
};

export default Bill;

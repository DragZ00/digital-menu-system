import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  customerName: "",
  customerPhone: "",
  guests: 0,
  tableNo: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
   setCustomer: (state, action) => {
  const { name, phone, guests } = action.payload;
 state.orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;

  state.customerName = name;
  state.customerPhone = phone;
  state.guests = guests;   
  state.tableNo = "";
},
veCustomer: (state) => {
      state.customerName = "";
      state.customerPhone = "";
      state.guests = 0;
      state.tableNo = "";
    },
    updateTable: (state, action) => {
      // HATA: tableNoÜ yazılmıştı → tableNo olmalı
      state.tableNo = action.payload.tableNo;
    },
  },
});

export const { setCustomer, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;

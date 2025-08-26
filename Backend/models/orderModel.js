const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    // İsterseniz sadece dish ref ile de gidebilirsiniz; name ve price'ı o anki fiyata "snap" olarak tutmak faydalı
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" }, // opsiyonel ama önerilir
    name: { type: String, required: true },                      // UI'de doğrudan göstermek için
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },                     // satır birim fiyatı
    note: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      guests: { type: Number, required: true, min: 1 },
    },

    orderStatus: {
      type: String,
      enum: ["pending", "ready", "completed"],
      default: "pending",
      required: true,
    },

    bills: {
      total: { type: Number, required: true },         // ara toplam
      tax: { type: Number, required: true },           // vergi tutarı
      totalwithtax: { type: Number, required: true },  // genel toplam
    },

    // FRONTEND ile aynı isim:
    orderItems: {
      type: [orderItemSchema],
      default: [],
      validate: (v) => Array.isArray(v),
    },

    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
    note: { type: String },
  },
  { timestamps: true } // createdAt, updatedAt
);

// İsteğe bağlı: istemciye dönerken __v gizle
orderSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Order", orderSchema);

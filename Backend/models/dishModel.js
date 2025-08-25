const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Yemek adı zorunludur"],
      trim: true,
      minlength: [2, "Yemek adı en az 2 karakter olmalı"],
      maxlength: [120, "Yemek adı en fazla 120 karakter olabilir"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Kategori zorunludur"],
    },
    price: {
      type: Number,
      required: [true, "Fiyat zorunludur"],
      min: [0, "Fiyat negatif olamaz"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Açıklama 500 karakteri aşamaz"],
    },
    image: {
      type: String, // URL (opsiyonel)
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);

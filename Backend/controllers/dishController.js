const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Dish = require("../models/dishModel");

// POST /api/dish
const addDish = async (req, res, next) => {
  try {
    const { name, category, price, description, image, isAvailable } = req.body;

    if (!name || !category || typeof price === "undefined") {
      return next(createHttpError(400, "name, category ve price zorunludur."));
    }

    const dish = await Dish.create({
      name: String(name).trim(),
      category,
      price,
      description,
      image,
      isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
    });

    res.status(201).json({
      success: true,
      message: "Yemek oluşturuldu.",
      data: dish,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/dish
// (opsiyonel filtre: ?category=<id>&q=<search text>&available=true/false)
const getDishes = async (req, res, next) => {
  try {
    const { category, q, available } = req.query;

    const filter = {};
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    }
    if (typeof available !== "undefined") {
      filter.isAvailable = String(available).toLowerCase() === "true";
    }
    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }

    const dishes = await Dish.find(filter)
      .populate({ path: "category", select: "name" })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: dishes });
  } catch (err) {
    next(err);
  }
};

// GET /api/dish/:id
const getDishById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(createHttpError(404, "Geçersiz yemek ID"));

    const dish = await Dish.findById(id).populate("category", "name");
    if (!dish) return next(createHttpError(404, "Yemek bulunamadı"));

    res.status(200).json({ success: true, data: dish });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/dish/:id
const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(createHttpError(404, "Geçersiz yemek ID"));

    const allowed = ["name", "category", "price", "description", "image", "isAvailable"];
    const update = {};
    for (const k of allowed) {
      if (typeof req.body[k] !== "undefined") update[k] = req.body[k];
    }

    const dish = await Dish.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    if (!dish) return next(createHttpError(404, "Yemek bulunamadı"));

    res.status(200).json({
      success: true,
      message: "Yemek güncellendi.",
      data: dish,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/dish/:id
const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(createHttpError(404, "Geçersiz yemek ID"));

    const deleted = await Dish.findByIdAndDelete(id);
    if (!deleted) return next(createHttpError(404, "Yemek bulunamadı"));

    res.status(200).json({ success: true, message: "Yemek silindi." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
};

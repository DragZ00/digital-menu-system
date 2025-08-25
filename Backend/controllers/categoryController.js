const Category = require("../models/categoryModel");

exports.addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: "Kategori adı gerekli." });
    }
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      return res.status(409).json({ success: false, message: "Kategori zaten var." });
    }
    const cat = await Category.create({ name: name.trim() });
    res.status(201).json({ success: true, message: "Kategori eklendi.", data: cat });
  } catch (err) { next(err); }
};

exports.getCategories = async (_req, res, next) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: cats });
  } catch (err) { next(err); }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await Category.findByIdAndDelete(id);
    if (!cat) return res.status(404).json({ success: false, message: "Kategori bulunamadı." });
    res.status(200).json({ success: true, message: "Kategori silindi.", data: cat });
  } catch (err) { next(err); }
};

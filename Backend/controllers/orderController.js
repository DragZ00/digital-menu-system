const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Order = require("../models/orderModel");

// UI -> backend status eşlemeleri (TR de gelebilir)
const mapToBackend = (raw = "") => {
  const v = String(raw).toLowerCase();
  if (["hazır", "ready"].includes(v)) return "ready";
  if (["tamamlanan", "completed", "done"].includes(v)) return "completed";
  if (["devam etmekte", "hazırlanıyor", "pending", "preparing", "in progress"].includes(v)) return "pending";
  return undefined;
};

const addOrder = async (req, res, next) => {
  try {
    // İstersen burada payload doğrulama/normalize yapabilirsin
    const order = new Order(req.body);
    await order.save();

    // Masa no’yu hemen görmek istersen populate edip döndürelim
    const saved = await Order.findById(order._id)
      .populate({ path: "table", select: "tableNo" });

    res.status(201).json({
      success: true,
      message: "Sipariş oluşturuldu",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Sipariş ID'si hatalı!"));
    }

    const order = await Order.findById(id)
      .populate({ path: "table", select: "tableNo" });

    if (!order) {
      return next(createHttpError(404, "Sipariş bulunamadı!"));
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const q = {};
    // ?status=... desteği (hem TR hem EN kabul)
    if (req.query.status) {
      const s = mapToBackend(req.query.status);
      if (s) q.orderStatus = s;
    }

    const orders = await Order.find(q)
      .populate({ path: "table", select: "tableNo" }) // ✅ Masa No
      .sort({ createdAt: -1 });                      // ✅ En yeniler üstte

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Sipariş ID'si hatalı!"));
    }

    // Yalnızca status güncelliyorsan:
    let update = {};
    if (typeof req.body.orderStatus !== "undefined") {
      const normalized = mapToBackend(req.body.orderStatus) || req.body.orderStatus;
      update.orderStatus = normalized;
    }

    // İstersen diğer alanları da esnek bırak:
    const allowed = ["bills", "customerDetails", "note"];
    for (const k of allowed) {
      if (typeof req.body[k] !== "undefined") update[k] = req.body[k];
    }

    const order = await Order.findByIdAndUpdate(id, update, { new: true })
      .populate({ path: "table", select: "tableNo" });

    if (!order) {
      return next(createHttpError(404, "Sipariş bulunamadı!"));
    }

    res.status(200).json({
      success: true,
      message: "Sipariş güncellendi",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Sipariş ID'si hatalı!"));
    }
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return next(createHttpError(404, "Sipariş bulunamadı!"));

    res.status(200).json({ success: true, message: "Sipariş silindi" });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  addOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder
};

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, trim: true, unique: true },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLocaleLowerCase("tr-TR")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
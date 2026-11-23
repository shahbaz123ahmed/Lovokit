// ========================================================
// CATEGORY & SUBCATEGORY MODEL DEFINITION
// ========================================================

export const CategorySchemaBlueprint = {
  id: { type: String, required: true, unique: true }, // e.g. "oscilloscopes"
  name: { type: String, required: true }, // e.g. "Oscilloscopes"
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String },
  image: { type: String },
  count: { type: Number, default: 0 },
  subcategories: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true },
      count: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

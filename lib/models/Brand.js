// ========================================================
// BRAND MODEL DEFINITION
// ========================================================

export const BrandSchemaBlueprint = {
  id: { type: String, required: true, unique: true }, // e.g. "lovosis", "owon"
  name: { type: String, required: true, unique: true }, // e.g. "LOVOSIS", "OWON"
  slug: { type: String, required: true, unique: true },
  logo: { type: String }, // path or CDN URL
  description: { type: String },
  featured: { type: Boolean, default: false },
  productCount: { type: Number, default: 0 },
  website: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

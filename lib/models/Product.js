// ========================================================
// PRODUCT MODEL DEFINITION (Mongoose / MongoDB Schema)
// ========================================================

/**
 * Product Data Schema Blueprint for Lovokit Platform
 * 
 * Fields:
 * - id: unique string identifier (e.g. 'xds3302')
 * - model: string (e.g. 'XDS3302')
 * - brand: string or ObjectId reference
 * - category: string or ObjectId reference
 * - subcategory: string
 * - title: string
 * - description: string
 * - price: string/number (e.g. '₹1,45,000' or 145000)
 * - originalPrice: string/number (e.g. '₹1,75,000')
 * - rating: number (default 5.0)
 * - reviews: number (default 0)
 * - inStock: boolean
 * - stockQuantity: number
 * - featured: boolean
 * - image: string (path or cloud CDN URL)
 * - gallery: array of strings
 * - specs: array of { label: string, value: string }
 * - detailedSpecs: object { vertical: [], horizontal: [], trigger: [], general: [] }
 */

export const ProductSchemaBlueprint = {
  id: { type: String, required: true, unique: true },
  model: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  categoryName: { type: String },
  subcategory: { type: String, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  numericPrice: { type: Number, index: true },
  originalPrice: { type: String },
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
  badgeTitle: { type: String },
  badgeSubtitle: { type: String },
  badgeType: { type: String },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  specs: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  detailedSpecs: { type: Object },
  hsnCode: { type: String, default: "90302000" },
  gstRate: { type: Number, default: 18.0 },
  rating: { type: Number, default: 5.0 },
  reviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

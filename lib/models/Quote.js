// ========================================================
// B2B QUOTE / RFP REQUEST MODEL DEFINITION
// ========================================================

export const QuoteRequestSchemaBlueprint = {
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  gstNumber: { type: String },
  packageType: { type: String }, // e.g. "Automotive & EV Diagnostic Station"
  requestedItems: [
    {
      productId: { type: String },
      model: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
  budget: { type: String },
  notes: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "IN_REVIEW", "QUOTED", "CLOSED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

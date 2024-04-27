import { Schema, model } from "mongoose";
const schema = new Schema({
  product: String,
  quantity: { type: Number, default: () => 1 },
  price: { type: Number, default: () => 1 },

  purchases: {
    type: [{ purchaseID: Schema.Types.ObjectId }],
    default: () => [],
  },
  sales: { type: [{ saleID: Schema.Types.ObjectId }], default: () => [] },
});
export const InventoryModel = model("Inventory", schema);

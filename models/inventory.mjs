import { Schema, model } from "mongoose";
const schema = new Schema({
  product: String,
  quantity: Number,
  price: Number,
  purchases: { type: [{ purchaseID: String }], default: () => [] },
  sales: { type: [{ saleID: String }], default: () => [] },
});
export const InventoryModel = model("Inventory", schema);

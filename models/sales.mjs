import { Schema, model } from "mongoose";
const schema = new Schema({
  sales: { type: [{ product: String, quantity: Number, price: Number }] },
});
export const SaleModel = model("Sale", schema);

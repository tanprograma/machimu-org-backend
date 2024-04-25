import { Schema, model } from "mongoose";
const schema = new Schema({
  purchases: { type: [{ product: String, quantity: Number, price: Number }] },
});
export const PurchasesModel = model("Purchase", schema);

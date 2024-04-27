import { Schema, model } from "mongoose";
const schema = new Schema({
  items: {
    type: [{ product: String, quantity: Number, price: Number }],
  },
  date: { type: Date, default: () => Date.now() },
});
export const SaleModel = model("Sale", schema);

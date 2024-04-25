import express from "express";
import dotenv from "dotenv";
import Inventory from "./routes/inventory.mjs";
import Sale from "./routes/sale.mjs";
import Purchase from "./routes/purchase.mjs";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/inventories", Inventory);
app.use("/sales", Sale);
app.use("/purchases", Purchase);
const PORT = process.env.PORT || 3000;
const connString = process.env.API || "";
const connectDB = () => {
  return mongoose.connect(connString);
};
connectDB().then((c) => {
  console.log("connected to the db successfully");
});
app.listen(PORT, async () => {
  console.log(`app actively listening on port ${PORT}`);
});

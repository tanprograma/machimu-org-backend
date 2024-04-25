import { Router } from "express";
import { SaleModel } from "../models/sales.mjs";
import { InventoryModel } from "../models/inventory.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const sales = await SaleModel.find();
  res.send(sales);
});
router.create("/create", async (req, res) => {
  const sale = await SaleModel.create(req.body.payload);
  const sales = [];
  if (sale.sales.length) {
    for (let i = 0; i < sale.sales.length; i++) {
      const product = sale.sales[i];
      const inventory = await InventoryModel.findOne({
        product: product.product,
      });
      inventory = {
        ...inventory,
        quantity: inventory.quantity - product.quantity,
        sales: [...inventory.sales, sale.id],
      };
    }
  }
  res.send(sale);
});
export default router;

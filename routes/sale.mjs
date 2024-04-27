import { Router } from "express";
import { SaleModel } from "../models/sales.mjs";
import { InventoryModel } from "../models/inventory.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const sales = await SaleModel.find();
  res.send({ result: sales });
});
router.post("/create", async (req, res) => {
  // creates single post
  const sale = await SaleModel.create(req.body.payload);

  // save to inventory
  await saveToInventory(sale);

  res.send({ result: sale });
});
router.post("/createmany", async (req, res) => {
  // creates many post
  const sale = await SaleModel.create(req.body.payload);

  // save to inventory
  for (let i = 0; i < sale.length; i++) {
    await saveToInventory(sale[i]);
  }

  res.send({ result: sale });
});
async function saveToInventory(sale) {
  for (let i = 0; i < sale.items.length; i++) {
    const product = sale.items[i];
    const inventory = await InventoryModel.findOne({
      product: product.product,
    });

    inventory.quantity -= product.quantity;
    inventory.sales = [...inventory.sales, sale._id];
    await inventory.save();
  }
}
export default router;

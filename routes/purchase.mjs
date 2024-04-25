import { Router } from "express";
import { PurchasesModel } from "../models/purchases.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const purchases = await PurchasesModel.find();
  res.send(purchases);
});
router.create("/create", async (req, res) => {
  const purchase = await PurchasesModel.create(req.body.payload);
  if (purchase.purchases.length) {
    for (let i = 0; i < purchase.purchases.length; i++) {
      const product = purchase.purchases[i];
      const inventory = await InventoryModel.findOne({
        product: product.product,
      });
      inventory = {
        ...inventory,
        quantity: inventory.quantity + product.quantity,
        purchases: [...inventory.purchases, purchase.id],
      };
    }
  }
  res.send(purchase);
});
export default router;

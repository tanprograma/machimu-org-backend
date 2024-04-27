import { Router } from "express";
import { PurchasesModel } from "../models/purchases.mjs";
import { InventoryModel } from "../models/inventory.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const purchases = await PurchasesModel.find();
  console.log(purchases);
  res.send({ result: purchases });
});
router.post("/create", async (req, res) => {
  const purchase = await PurchasesModel.create(req.body.payload);
  console.log(purchase);
  await saveToInventory(purchase);
  // res.send({ result: req.body.payload });
  res.send({ result: purchase });
});
router.post("/createmany", async (req, res) => {
  // creates many records
  const purchase = await PurchasesModel.create(req.body.payload);
  console.log(purchase);
  for (let i = 0; i < purchase.length; i++) {
    const product = purchase[i];
    saveToInventory(product);
  }
  res.send({ result: purchase });
});
async function saveToInventory(purchase) {
  for (let i = 0; i < purchase.items.length; i++) {
    const product = purchase.items[i];
    const inventory = await InventoryModel.findOne({
      product: product.product,
    });
    console.log({
      product,
      inventory,
    });

    inventory.quantity -= product.quantity;
    inventory.purchases.push(purchase._id);
    await inventory.save();
  }
}
export default router;

import { Router } from "express";
import { InventoryModel } from "../models/inventory.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const inventories = await InventoryModel.find();
  res.send(inventories);
});
router.post("/create", async (req, res) => {
  const inventory = await InventoryModel.create(req.body.payload);
  res.send(inventory);
});
export default router;

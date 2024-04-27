import { Router } from "express";
import { InventoryModel } from "../models/inventory.mjs";
const router = Router();
router.get("/", async (req, res) => {
  const inventories = await InventoryModel.find();
  res.send({ result: inventories });
});
router.post("/create", async (req, res) => {
  const inventory = await InventoryModel.create(req.body.payload);
  res.send({ result: inventory });
});
// creates many records
router.post("/createmany", async (req, res) => {
  const inventory = await InventoryModel.create(req.body.payload);
  res.send({ result: inventory });
});
export default router;

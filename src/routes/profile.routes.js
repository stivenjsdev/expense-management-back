import { Router } from "express";
import {
  createExpense,
  createProduct,
  createRevenue,
  getCurrentValues,
  getProfile,
} from "../controllers/profile.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = Router();

// router.method('path', middleware, controller);
router.get("/me", checkToken, getProfile);
router.get("/currentTotals", checkToken, getCurrentValues);
router.post("/product", checkToken, createProduct);
router.post("/expense", checkToken, createExpense);
router.post("/revenue", checkToken, createRevenue);

export default router;

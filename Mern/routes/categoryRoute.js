import express from "express";
import { isAdmin, requireAuth } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/create-category", requireAuth, isAdmin, createCategoryController);

router.put(
  "/update-category/:id",
  requireAuth,
  isAdmin,
  updateCategoryController
);

router.get("/all-categories", getCategoryController);
router.get("/single-category/:slug/:id",getSingleCategoryController);
router.delete("/delete-category/:id",requireAuth,isAdmin,deleteCategoryController)

export default router;

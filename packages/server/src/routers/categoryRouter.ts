import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", isAuthenticated, addCategory);
categoryRouter.put("/:id", isAuthenticated, updateCategory);
categoryRouter.delete("/:id", isAuthenticated, deleteCategory);

export default categoryRouter;
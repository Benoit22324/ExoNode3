import { Router } from "express";
import { addMaterial, deleteMaterial, getAllMaterials, getMaterial, updateMaterial } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const materialRouter = Router();

materialRouter.get("/", getAllMaterials);
materialRouter.get("/:id", getMaterial);
materialRouter.post("/", isAuthenticated, addMaterial);
materialRouter.put("/:id", isAuthenticated, updateMaterial);
materialRouter.delete("/:id", isAuthenticated, deleteMaterial);

export default materialRouter;
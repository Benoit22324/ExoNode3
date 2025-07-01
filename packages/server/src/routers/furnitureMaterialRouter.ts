import { Router } from "express";
import { addFMat, deleteFMat, getFMatByFurniture, updateFMat } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const furnitureMaterialRouter = Router();

furnitureMaterialRouter.get("/:furnitureId", getFMatByFurniture);
furnitureMaterialRouter.post("/", isAuthenticated, addFMat);
furnitureMaterialRouter.put("/:id", isAuthenticated, updateFMat);
furnitureMaterialRouter.delete("/:id", isAuthenticated, deleteFMat);

export default furnitureMaterialRouter;
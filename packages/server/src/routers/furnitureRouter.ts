import { Router } from "express";
import { addFurniture, deleteFurniture, getAllFurnitures, getFurniture, updateFurniture } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const furnitureRouter = Router();

furnitureRouter.get("/", getAllFurnitures);
furnitureRouter.get("/:id", getFurniture);
furnitureRouter.post("/", isAuthenticated, addFurniture);
furnitureRouter.put("/:id", isAuthenticated, updateFurniture);
furnitureRouter.delete("/:id", isAuthenticated, deleteFurniture);

export default furnitureRouter;
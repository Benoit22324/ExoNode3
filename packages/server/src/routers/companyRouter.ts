import { Router } from "express";
import { addCompany, deleteCompany, getAllCompanies, getCompany, updateCompany } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const companyRouter = Router();

companyRouter.get("/", getAllCompanies);
companyRouter.get("/:id", getCompany);
companyRouter.post("/", isAuthenticated, addCompany);
companyRouter.put("/:id", isAuthenticated, updateCompany);
companyRouter.delete("/", isAuthenticated, deleteCompany);

export default companyRouter;
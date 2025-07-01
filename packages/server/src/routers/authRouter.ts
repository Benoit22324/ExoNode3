import { Router } from "express";
import { authLogin, authLogout } from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const authRouter = Router();

authRouter.get("/logout", isAuthenticated, authLogout);
authRouter.post("/login", authLogin);

export default authRouter;
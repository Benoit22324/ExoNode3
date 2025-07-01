import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { getUser, updateUser } from "../controllers";

const userRouter = Router();

userRouter.get("/", isAuthenticated, getUser);
userRouter.put("/", isAuthenticated, updateUser);

export default userRouter;
import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import companyRouter from "./companyRouter";
import categoryRouter from "./categoryRouter";
import furnitureRouter from "./furnitureRouter";
import furnitureMaterialRouter from "./furnitureMaterialRouter";
import materialRouter from "./materialRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company", companyRouter);
router.use("/category", categoryRouter);
router.use("/furniture", furnitureRouter);
router.use("/fmat", furnitureMaterialRouter);
router.use("/material", materialRouter);

export default router;
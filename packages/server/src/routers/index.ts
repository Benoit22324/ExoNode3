import { Router } from "express";
import { apiResponse } from "../utils/apiResponse";

const router = Router();

router.get("/", async (req, res) => {
    apiResponse(res, null, "Hello World")
})

export default router;
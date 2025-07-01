import express, { urlencoded } from "express";
import cors from "cors";
import { env } from "./config/env";
import router from "./routers";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(router);

app.listen(env.PORT, () => console.log("Server On !"));
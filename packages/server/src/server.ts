import express, { urlencoded } from "express";
import cors from "cors";
import { env } from "./config/env";
import router from "./routers";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(router);

app.listen(env.PORT, () => console.log("Server On !"));
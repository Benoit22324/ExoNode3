import express, { urlencoded } from "express";
import cors from "cors";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.listen(env.PORT, () => console.log("Server On !"));
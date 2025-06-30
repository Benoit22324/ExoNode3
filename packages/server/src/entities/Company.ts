import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { companies } from "../schemas";

export type Company = InferSelectModel<typeof companies>;

export type NewCompany = InferInsertModel<typeof companies>;
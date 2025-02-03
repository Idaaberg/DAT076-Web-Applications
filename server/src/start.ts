import express from "express";
import { bookRouter } from "./router/book";

export const app = express();

app.use(express.json());
app.use("/book", bookRouter);
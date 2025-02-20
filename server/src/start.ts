import express from "express";
import { bookRouter } from "./router/book";
import { BookService } from "./service/book";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { UserService } from "./service/user";
import { userRouter } from "./router/user";

export const app = express();

app.use(express.json());
// dotenv.config();
// if (! process.env.SESSION_SECRET) {
//   console.log("Could not find SESSION_SECRET in .env file");
//   process.exit();
// }
app.use(session({
    secret : "My secret passphrase",
    resave : false,
    saveUninitialized : true
}));
app.use(cors({
  origin: true,
  credentials: true
}));
const userService = new UserService();
const bookService = new BookService(userService);

app.use("/user", userRouter(userService));
app.use("/book", bookRouter(bookService));
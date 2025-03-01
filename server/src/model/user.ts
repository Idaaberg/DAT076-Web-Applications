import { Book } from "./book.interface";

export interface User {
    username : string,
    password : string,
    books : Book[]
}
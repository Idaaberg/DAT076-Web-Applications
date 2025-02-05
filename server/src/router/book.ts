import express, { Request, Response } from "express";
import { BookService } from "../service/book";
import { Book, BookState } from "../model/book.interface";

const bookService = new BookService();

export const bookRouter = express.Router();

bookRouter.get("/", async (
    req: Request<{},{},{}>,
    res: Response<Array<Book> | string>
) => {
    try {
        const bookShelf = await bookService.getBooks();
        res.status(200).send(bookShelf);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.post("/", async (
    req: Request<{}, {}, {title: string, author: string, state: BookState, rating: number, comment: string}>,
    res: Response<Book | string>
) => {
    try {
        const { title, author, state, rating, comment } = req.body;
        if (typeof title !== "string" ||
            typeof author !== "string" ||
            !Object.values(BookState).includes(state) ||
            typeof rating !== "number" ||
            typeof comment !== "string"
        ){
            res.status(400).send(`Invalid input`);
        } else {
            const newBook = await bookService.addBook(title, author, state, rating, comment);
            res.status(201).send(newBook);}
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

bookRouter.patch("/:id", async (
    req: Request<{ id: string }, {}, {title: string, author: string, state: BookState, rating: number, comment: string}>,
    res: Response<Book | string>
) => {
    
    try {
        const { title,author,state,rating,comment } = req.body;
        if (req.params.id == null) {
            res.status(400).send(`Missing id param`);
            return;
        }

    if (!Object.values(BookState).includes(state)) {
        res.status(400).send(`Field 'state' must be a BookState`);
     return;
    }

    const index = parseInt(req.params.id, 10);

    if (! (index >= 0)) {
        res.status(400).send(`id number must be a non-negative integer`);
        return;
    }

    const stateChange = await bookService.editBookProps(index, title, author, state, rating, comment);

    if (!stateChange) {
        res.status(404).send(`No book with index ${index}`)
        return;
    }

    res.status(200).send(`Book has been edited!`);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

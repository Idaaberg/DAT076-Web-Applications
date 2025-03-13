import express, { Request, Response, Router } from "express";
import { Book, BookState } from "../model/book.interface";
import { IBookService } from "../service/IBookService.interface";
import { BookService } from "../service/book";


export function bookRouter(bookService: IBookService): Router {
    const bookRouter = express.Router();

    interface BookRequest {
        session: any
    }

    // GET /book
    bookRouter.get("/", async (req: BookRequest, res: Response<Book[] | string>) => {
        try {
            if (!req.session.username) {
                res.status(401).send("Not logged in");
                return;
            }
            const bookShelf: Book[] | undefined = await bookService.getBooks(req.session.username) || [];
            
            res.status(200).send(bookShelf);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    interface BookRequestWithId extends BookRequest {
        params: { id: string };
    }

    // GET /book/:id
    bookRouter.get('/:id', async (req: BookRequestWithId, res: Response<Book | string>) => {
        try {
            if (!req.session.username) {
                res.status(401).send("Not logged in");
                return;
            }
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).send("Invalid book ID");
                return;
            }
            const book: Book | undefined = await bookService.getBookById(id);
            res.status(200).send(book);
            if (!book) {
                res.status(404).send("Book with the given ID does not exist");
                return;
            }
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    });

    interface CreateBookRequest extends Request {
        body: { title: string, author: string, state: BookState, rating?: number | undefined, comment?: string | undefined },
        session: any
    }

    // POST /book
    bookRouter.post("/", async (req: CreateBookRequest, res: Response<Book | string>) => {
        try {
            if (!req.session.username) {
                res.status(401).send("Not logged in");
                return;
            }
            const { title, author, state, rating, comment } = req.body;
            if (!title || !author || !state) {
                res.status(400).send("Title, author, and state are required fields.");
                return;
            }
            if (!Object.values(BookState).includes(state)) {
                res.status(400).send(`Field 'state' must be a valid BookState.`);
                return;
            }
            if (rating !== undefined && !BookService.validateRating(rating)) {
                res.status(400).send("Invalid rating value.");
                return;
            }
            const newBook: Book | undefined = await bookService.addBook(req.session.username, title, author, state, rating, comment);
            if (!newBook) {
                console.log("User logged in as " + req.session.username + " no longer exists");
                delete req.session.username;
                res.status(401).send("Not logged in");
                return;
            }
            res.status(201).send(newBook);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    interface EditBookRequest extends Request {
        params: { id: string };
        body: { title: string, author: string, state: BookState, rating?: number | undefined, comment?: string | undefined },
        session: any
    }

    // PATCH /book/:id
    bookRouter.patch("/:id", async (req: EditBookRequest, res: Response<Book | string>) => {
        try {
            if (!req.session.username) {
                res.status(401).send("Not logged in");
                return;
            }
            const { title, author, state, rating, comment } = req.body;
            if (req.params.id == null) {
                res.status(400).send(`Missing id param`);
                return;
            }
            if (!Object.values(BookState).includes(state)) {
                res.status(400).send(`Field 'state' must be a BookState`);
                return;
            }
            const index = parseInt(req.params.id, 10);
            if (!(index >= 0)) {
                res.status(400).send(`id number must be a non-negative integer`);
                return;
            }
            const stateChange = await bookService.editBook(req.session.username, index, title, author, state, rating, comment);
            if (!stateChange) {
                res.status(404).send(`No book with index ${index}`)
                return;
            }
            res.status(200).send(`Book has been edited!`);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    // DELETE /book/:id
    bookRouter.delete("/:id", async (req: BookRequestWithId, res: Response<string>) => {
        try {
            if (!req.session.username) {
                res.status(401).send("Not logged in");
                return;
            }
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).send("Invalid book ID");
                return;
            }
            const deletedBook = await bookService.deleteBook(req.session.username, id);
            if (!deletedBook) {
                res.status(404).send(`No book with id ${id}`);
                return;
            }
            res.status(200).send(`Book with id ${id} has been deleted`);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    return bookRouter;
}
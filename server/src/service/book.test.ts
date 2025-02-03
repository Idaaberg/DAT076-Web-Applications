import { BookState } from "../model/book.interface";
import { BookService } from "./book";

test("If a book is added to the list then it should be in the list", async () => {
        const title = "Test Title";
        const author = "Test Author";
        const state: BookState = BookState.HaveRead;
        const rating = 5;
        const comment = "Test Comment";
        const bookService = new BookService();
        await bookService.addBook(title, author, state, rating, comment);
        const books = await bookService.getBooks();
        
        expect(books.some((book) => book.title === title)).toBeTruthy();
        expect(books.some((book) => book.author === author)).toBeTruthy();
        expect(books.some((book) => book.state === state)).toBeTruthy();
        expect(books.some((book) => book.rating === rating)).toBeTruthy();
        expect(books.some((book) => book.comment === comment)).toBeTruthy();
    })
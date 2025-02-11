import { BookState } from "../model/book.interface";
import { BookService } from "./book";

describe("BookService", () => {
    let bookService: BookService;

    //Initialize a new BookService instance before each test
    beforeEach(() => {
        bookService = new BookService(); 
    });

    // Helper function to add a book and return the list of books
    const addAndFetchBooks = async (title: string, author: string, state: BookState, rating?: number, comment?: string) => {
        await bookService.addBook(title, author, state, rating, comment);
        return bookService.getBooks();
    };

    test("should add a book to the list", async () => {
        const title = "Test Title";
        const author = "Test Author";
        const state: BookState = BookState.HaveRead;
        const rating = 5;
        const comment = "Test Comment";

        const books = await addAndFetchBooks(title, author, state, rating, comment);

        // Assert that the book is added with all properties
        const addedBook = books.find((book) => book.title === title);
        expect(addedBook).toBeDefined();
        expect(addedBook?.author).toBe(author);
        expect(addedBook?.state).toBe(state);
        expect(addedBook?.rating).toBe(rating);
        expect(addedBook?.comment).toBe(comment);
    });

    test("should allow adding a book without a rating or comment", async () => {
        const title = "Test Title";
        const author = "Test Author";
        const state: BookState = BookState.HaveRead;
        const rating = undefined;
        const comment = undefined;

        const books = await addAndFetchBooks(title, author, state, rating, comment);

        // Assert that the book is added with undefined rating and comment
        const addedBook = books.find((book) => book.title === title);
        expect(addedBook).toBeDefined();
        expect(addedBook?.rating).toBeUndefined();
        expect(addedBook?.comment).toBeUndefined();
    });

    test("should not allow rating to be negative", async () => {
        const title = "Test Title";
        const author = "Test Author";
        const state: BookState = BookState.HaveRead;
        const rating = -1;
        const comment = undefined;

        // Assert that the book is not added and an error is thrown
        await expect(addAndFetchBooks(title, author, state, rating, comment))
        .rejects
        .toThrow("Invalid rating value"); 
    });

    test("should edit the book properties", async () => {
        const title = "Test Title";
        const author = "Test Author";
        const state: BookState = BookState.HaveRead;
        const rating = 5;
        const comment = "Test Comment";

        const books = await addAndFetchBooks(title, author, state, rating, comment);
        const book = books.find((book) => book.title === title);

        // Assert that the book is added with all properties
        expect(book).toBeDefined();
        expect(book?.author).toBe(author);
        expect(book?.state).toBe(state);
        expect(book?.rating).toBe(rating);
        expect(book?.comment).toBe(comment);

        // Edit the book properties
        const newTitle = "New Title";
        const newAuthor = "New Author";
        const newState: BookState = BookState.WantToRead;
        const newRating = 4;
        const newComment = "New Comment";

        const editedBook = await bookService.editBookProps(book!.id, newTitle, newAuthor, newState, newRating, newComment);

        // Assert that the book properties are edited
        expect(editedBook).toBeDefined();
        expect(editedBook?.title).toBe(newTitle);
        expect(editedBook?.author).toBe(newAuthor);
        expect(editedBook?.state).toBe(newState);
        expect(editedBook?.rating).toBe(newRating);
        expect(editedBook?.comment).toBe(newComment);
    });
});
import { BookService } from "../service/book";
import { UserService } from "../service/user";
import { Book, BookState } from "../model/book.interface";

describe("BookService", () => {
    let bookService: BookService;
    let userService: UserService;
    
    beforeEach(async () => {
        userService = new UserService();
        await userService.createUser("TestUser", "TestPassword"); 
        bookService = new BookService(userService);
    });

    test("Adding a book should store it under the user's account", async () => {
        const newBook = await bookService.addBook(
            "TestUser",
            "Test Title",
            "Test Author",
            BookState.HaveRead,
            5,
            "Great book!"
        );

        expect(newBook).toBeDefined();
        expect(newBook?.title).toBe("Test Title");
        expect(newBook?.author).toBe("Test Author");

        const books = await bookService.getBooks("TestUser");
        expect(books?.length).toBe(1);
        expect(books?.[0].title).toBe("Test Title");
    });

    test("Fetching books for a user should return the correct list", async () => {
        await bookService.addBook("TestUser", "Book A", "Author A", BookState.WantToRead);
        await bookService.addBook("TestUser", "Book B", "Author B", BookState.Reading);
        
        const books = await bookService.getBooks("TestUser");
        expect(books?.length).toBe(2);
        expect(books?.map(book => book.title)).toContain("Book A");
        expect(books?.map(book => book.title)).toContain("Book B");
    });

    test("Editing a book should update the correct book details", async () => {
        const book = await bookService.addBook("TestUser", "Original Title", "Original Author", BookState.HaveRead);
        expect(book).toBeDefined();
        
        const updatedBook = await bookService.editBookProps(
            "TestUser",
            book!.id,
            "Updated Title",
            "Updated Author",
            BookState.Reading,
            4,
            "Updated comment"
        );

        expect(updatedBook).toBeDefined();
        expect(updatedBook?.title).toBe("Updated Title");
        expect(updatedBook?.author).toBe("Updated Author");

        const books = await bookService.getBooks("TestUser");
        expect(books?.map(book => book.title)).toContain("Updated Title");
    });

    test("Fetching a book by ID should return the correct book", async () => {
        const book = await bookService.addBook("TestUser", "Find Me", "Author", BookState.HaveRead);
        expect(book).toBeDefined();

        const fetchedBook = await bookService.getBookById("TestUser", book!.id);
        expect(fetchedBook).toBeDefined();
        expect(fetchedBook?.title).toBe("Find Me");
    });

    test("Trying to add a book for a non-existent user should return undefined", async () => {
        const book = await bookService.addBook("FakeUser", "Title", "Author", BookState.HaveRead);
        expect(book).toBeUndefined();
    });

    test("Trying to edit a book for a non-existent user should return undefined", async () => {
        const book = await bookService.editBookProps("FakeUser", 1, "New Title", "New Author", BookState.Reading);
        expect(book).toBeUndefined();
    });

    test("Trying to edit a non-existent book should return undefined", async () => {
        const book = await bookService.editBookProps("TestUser", 999, "New Title", "New Author", BookState.Reading);
        expect(book).toBeUndefined();
    });
});

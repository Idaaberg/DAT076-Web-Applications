import { BookService } from "./book";
import { UserService } from "./user";
import { BookState } from "../model/book.interface";
import { conn } from "../db/conn";
import { UserModel } from "../db/user.db";
import { BookModel } from "../db/book.db";


beforeAll(async () => {
    await conn.sync({ force: true });
});

afterAll(async () => {
    await conn.close();
});

describe('BookService Tests', () => {
    let bookService: BookService;
    let userService: UserService;

    beforeAll(async () => {
        userService = new UserService();
        bookService = new BookService(userService);

        const user = await UserModel.create({
            username: 'testuser',
            password: 'password',
        });

        await BookModel.create({
            title: 'Test Book 1',
            author: 'Author 1',
            state: BookState.HaveRead,
            rating: 5,
            comment: 'Great book!',
            userId: user.id,
        });

        await BookModel.create({
            title: 'Test Book 2',
            author: 'Author 2',
            state: BookState.WantToRead,
            rating: 4,
            comment: 'Want to read!',
            userId: user.id,
        });
    });

    test('getBooks should return books for a valid user', async () => {
        const books = await bookService.getBooks('testuser');
        expect(books).toBeDefined();
        expect(books).toHaveLength(2);
        if (books) {
            expect(books[0].title).toBe('Test Book 1');
            expect(books[1].author).toBe('Author 2');
        }
    });

    test('getBookById should return a specific book by id', async () => {
        const book = await bookService.getBookById(1);
        expect(book).toBeDefined();
        expect(book?.title).toBe('Test Book 1');
    });

    test('addBook should add a new book to the user\'s collection', async () => {
        const newBook = await bookService.addBook(
            'testuser',
            'Test Book 3',
            'Author 3',
            BookState.Reading,
            3,
            'Interesting book.'
        );
        expect(newBook).toBeDefined();
        expect(newBook?.title).toBe('Test Book 3');
        expect(newBook?.state).toBe(BookState.Reading);
    });

    test('editBook should update a book\'s information', async () => {
        const updatedBook = await bookService.editBook(
            'testuser',
            1,
            'Updated Book Title',
            'Updated Author',
            BookState.Reading,
            4,
            'Updated comment.'
        );
        expect(updatedBook).toBeDefined();
        expect(updatedBook?.title).toBe('Updated Book Title');
        expect(updatedBook?.author).toBe('Updated Author');
    });
});
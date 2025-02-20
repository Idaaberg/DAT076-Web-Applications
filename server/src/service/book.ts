import { Book, BookState } from '../model/book.interface';
import { User } from '../model/user';
import { UserService } from "./user";

export class BookService {
    private userService: UserService
    private nextId: number = 0

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getBooks(username: string): Promise<Book[] | undefined> {
        const user: User | undefined = await this.userService.findUser(username);
        if (!user) {
            return undefined
        }
        return JSON.parse(JSON.stringify(user.books));
    }

    async getBookById(username: string, id: number): Promise<Book | undefined> {
        const user: User | undefined = await this.userService.findUser(username);
        if (!user) {
            return undefined
        }
        const book: Book | undefined = user.books.find((book) => book.id === id)
        if (!book) {
            return undefined;
        }
        return book;
    }

    static validateRating(rating?: number): rating is 1 | 2 | 3 | 4 | 5 | undefined {
        return rating === undefined || [1, 2, 3, 4, 5].includes(Number(rating));
    }

    async addBook(
        username: string,
        title: string,
        author: string,
        state: BookState,
        rating?: number | undefined,
        comment?: string | undefined
    ): Promise<Book | undefined> {
        if (rating !== undefined && !BookService.validateRating(rating)) {
            throw new Error("Invalid rating value");
        }
        const newBook: Book = {
            id: this.nextId++,
            title: title,
            author: author,
            state: state,
            rating: rating,
            comment: comment
        }
        const user: User | undefined = await this.userService.findUser(username);

        if (!user) {
            return undefined
        }
        user.books.push(newBook);
        return { ...newBook };
    }

    async editBookProps(
        username: string,
        id: number,
        title: string,
        author: string,
        state: BookState,
        rating?: number,
        comment?: string
    ): Promise<Book | undefined> {
        const user: User | undefined = await this.userService.findUser(username);
        if (!user) {
            return undefined
        }
        const book = user.books.find((book) => book.id === id);
        if (!book) {
            return undefined;
        }
        book.title = title;
        book.author = author;
        book.state = state;
        if (BookService.validateRating(rating)) {
            book.rating = rating;
        } else {
            throw new Error("Invalid rating value");
        }
        book.comment = comment;
        return { ...book };
    }
}
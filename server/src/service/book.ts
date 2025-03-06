import { Book, BookState } from '../model/book.interface';
import { User } from '../model/user';
import { IBookService } from './IBookService.interface';
import { BookModel } from "../db/book.db";
import { UserService } from './user';

export class BookService implements IBookService {
    private userService: UserService;
    private nextId: number = 0

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getBooks(username: string) : Promise<Book[] | undefined> {
        const user : User | undefined = await this.userService.findUser(username);
        if (! user) {
            return undefined
        }
        const books = await BookModel.findAll({ where: {userId: user.id }});
        return books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            state: book.state,
            rating: BookService.validateRating(book.rating) ? book.rating : undefined,
            comment: book.comment
        }));
    }


    async getBookById(username: string, id: number): Promise<Book | undefined> {
        const book = await BookModel.findByPk(id);
        if (!book) {
            return undefined;
        }
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            state: book.state,
            rating: BookService.validateRating(book.rating) ? book.rating : undefined,
            comment: book.comment
        }
    }

    static validateRating(rating?: number): rating is 1 | 2 | 3 | 4 | 5 | undefined {
        return rating === undefined || [1, 2, 3, 4, 5].includes(Number(rating));
    }

    async addBook(
        username: string,
        title: string,
        author: string,
        state: BookState,
        rating?:  number,
        comment?: string
    ): Promise<Book | undefined> {

        const user : User | undefined = await this.userService.findUser(username);
        if (! user) {
            return undefined;
        }
        if (rating !== undefined && !BookService.validateRating(rating)) {
            throw new Error("Invalid rating value");
        }
        const newBook = await BookModel.create({
            id: this.nextId++,
            title: title,
            author: author,
            state: state,
            rating: rating || NaN,
            comment: comment || '',
            userId: user.id

        })
        if (!user) {
            return undefined;
        }
        return {
            id: newBook.id,
            title: newBook.title,
            author: newBook.author,
            state: newBook.state,
            rating: BookService.validateRating(newBook.rating) ? newBook.rating : undefined,
            comment: newBook.comment
        };
    }

    async editBook(
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
            return undefined; 
        }
    
        const bookToUpdate = await BookModel.findOne({
            where: { id, userId: user.id }
        });
    
        if (!bookToUpdate) {
            return undefined; 
        }
    
        if (rating !== undefined && !BookService.validateRating(rating)) {
            throw new Error("Invalid rating value");
        }
    
        const updatedBook = await bookToUpdate.update({
            title,
            author,
            state,
            rating: rating ?? undefined, 
            comment: comment || '', 
        });
    
        return {
            id: updatedBook.id,
            title: updatedBook.title,
            author: updatedBook.author,
            state: updatedBook.state,
            rating: BookService.validateRating(updatedBook.rating) ? updatedBook.rating : undefined, 
            comment: updatedBook.comment
        };
    }
}
import { Book, BookState } from '../model/book.interface';
import { User } from '../model/user';
import { IBookService } from './IBookService.interface';
import { BookModel } from "../db/book.db";
import { UserService } from './user';


/**
 * Service for book-related operations
 */
export class BookService implements IBookService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    /**
     * Returns a list of books for a given user
     * @param username 
     * @returns Book[] if successful or undefined if the user does not exist
     */
    async getBooks(username: string): Promise<Book[] | undefined> {
        const user: User | undefined = await this.userService.findUser(username);
        if (!user) {
            return undefined
        }
        const books = await BookModel.findAll({ where: { userId: user.id } });
        return books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            state: book.state,
            rating: BookService.validateRating(book.rating) ? book.rating : undefined,
            comment: book.comment
        }));
    }

    /**
     * Returns a book by its ID
     * @param id 
     * @returns Book if successful or undefined if the book does not exist
     */
    async getBookById(id: number): Promise<Book | undefined> {
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

    /**
     * Validates a rating value
     * @param rating 
     * @returns true if the rating is valid, false otherwise
    */
    static validateRating(rating?: number): rating is 1 | 2 | 3 | 4 | 5 | undefined {
        return rating === undefined || [1, 2, 3, 4, 5].includes(Number(rating));
    }

    /**
     * Adds a book to the user's bookshelf
     * @param username 
     * @param title 
     * @param author 
     * @param state 
     * @param rating 
     * @param comment 
     * @returns the created book if successful, or undefined if the user does not exist
     */
    async addBook(
        username: string,
        title: string,
        author: string,
        state: BookState,
        rating?: number,
        comment?: string
    ): Promise<Book | undefined> {
        try {
            const user: User | undefined = await this.userService.findUser(username);
            if (!user) {
                return undefined;
            }
            if (rating !== undefined && !BookService.validateRating(rating)) {
                throw new Error("Invalid rating value");
            }
            const newBook = await BookModel.create({
                title: title,
                author: author,
                state: state,
                rating: rating || undefined,
                comment: comment || undefined,
                userId: user.id
            });
            return {
                title: newBook.title,
                author: newBook.author,
                state: newBook.state,
                rating: BookService.validateRating(newBook.rating) ? newBook.rating : undefined,
                comment: newBook.comment
            };
        } catch (e) {
            console.error("Error occurred while adding book:", e);
            return undefined;
        }
    }

    /**
     * Edits a book in the user's bookshelf
     * @param username 
     * @param id 
     * @param title 
     * @param author 
     * @param state 
     * @param rating 
     * @param comment 
     * @returns the updated book if successful, or undefined if the user or book does not exist
     */
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
            comment: comment ?? undefined,
        });

        return {
            title: updatedBook.title,
            author: updatedBook.author,
            state: updatedBook.state,
            rating: BookService.validateRating(updatedBook.rating) ? updatedBook.rating : undefined,
            comment: updatedBook.comment
        };
    }

    /**
     * Deletes a book from the user's bookshelf
     * @param username 
     * @param id - the ID of the book to delete
     * @returns true if successful, or false if the user or book does not exist
     */
    async deleteBook(username: string, id: number): Promise<boolean> {
        const user: User | undefined = await this.userService.findUser(username);
        if (!user) {
            return false;
        }

        const bookToDelete = await BookModel.findOne({
            where: { id, userId: user.id }
        });

        if (!bookToDelete) {
            return false;
        }

        await bookToDelete.destroy();
        return true;
    }

}
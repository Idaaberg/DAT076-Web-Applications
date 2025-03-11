import { Book } from "../model/book.interface";

export interface IBookService {
    getBooks(username: string): Promise<Book[] | undefined>;

    getBookById(id: number): Promise<Book | undefined>;

    addBook(
        username: string,
        title: string,
        author: string, 
        state: string, 
        rating?: number, 
        comment?: string
    ): Promise<Book | undefined>;
    
    editBook(
        username: string,
        id: number, 
        title: string, 
        author: string, 
        state: string, 
        rating?: number, 
        comment?: string
    ): Promise<Book | undefined>;

    deleteBook(username: string, id: number): Promise<boolean>;
}
import { Book, BookState } from '../model/book.interface';

export class BookService {
    private bookShelf : Book[] = [];

    async getBooks() : Promise<Book[]> {
        return JSON.parse(JSON.stringify(this.bookShelf));
    }

    static validateRating(rating?: number): rating is 1 | 2 | 3 | 4 | 5 | undefined {
        return rating === undefined || [1, 2, 3, 4, 5].includes(rating);
    }

    async addBook(title: string, author: string, state: BookState, rating?: number, comment?: string) : Promise<Book> {
        if (rating !== undefined && !BookService.validateRating(rating)) {
            throw new Error("Invalid rating value");
        }
        const newBook : Book = {
            id: Date.now(),
            title: title,
            author: author,
            state: state,
            rating: rating,
            comment: comment
        }
        this.bookShelf.push(newBook);
        return {...newBook};
    }

    async editBookProps(id: number, title: string, author: string, state: BookState, rating: number, comment: string) : Promise<Book | undefined> {
        const book = this.bookShelf.find((book) => book.id === id);
        if (! book) {
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
        return {...book};
    }
}
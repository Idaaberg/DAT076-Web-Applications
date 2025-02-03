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

    async changeBookState(id: number, state: BookState) : Promise<Book | undefined> {
        const book = this.bookShelf.find((book) => book.id === id);
        if (! book) {
            return undefined;
        }
        book.state = state;
        return {...book};
    }

    // async setRating(id: number, rating: number) :Promise<Book | undefined> {
    //     const book = this.bookShelf.find((book) => book.id === id);
    //     if (! book) {
    //         return undefined;
    //     }
    //     if(book.state === BookState.HaveRead) {
    //         book.rating = rating;
    //     }
    // }
}
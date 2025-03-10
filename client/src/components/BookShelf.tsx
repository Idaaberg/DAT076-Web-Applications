import { Book } from '../api';
import { BookComponent } from './Book';


/**
 * Defines the BookShelf component
 * @param books - the list of books
 * @returns BookShelf component
 */
export function BookShelfComponent({ books }: { books: Book[] }) {
    return (
        <div className="bookShelf">
            <ul className="bookShelfHeader">
                <div>Cover</div>
                <div>Title</div>
                <div>Author</div>
                <div>Status</div>
                <div>Rating</div>
            </ul>
            <ul>
                {books.map((book, index) => (
                    <BookComponent key={index} book={book} />
                ))}
            </ul>
        </div>
    );
}



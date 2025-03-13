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
            <div className="bookShelfHeader">
                <div className='headerInfo'>Cover</div>
                <div className='headerInfo'>Title</div>
                <div className='headerInfo'>Author</div>
                <div className='headerInfo'>Status</div>
                <div className='headerInfo'>Rating</div>
            </div>
            <ul>
                {books.map((book, index) => (
                    <BookComponent key={index} book={book} />
                ))}
            </ul>
        </div>
    );
}



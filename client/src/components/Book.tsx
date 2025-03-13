import { Book } from '../api';
import defaultImage from '../img/default.jpg';

/**
 * Defines the Book component
 * @param book - the book
 * @returns Book component
 */
export function BookComponent({ book }: { book: Book }) {
    return (
        <a href={`/edit/${book.id}`}>
            <div className="bookCard">
                <div className="book-image">
                    <img
                        src={defaultImage}
                        alt={`Cover of ${book.title}`}
                        width="100px"
                        height="150px"
                    />
                </div>
                <div className='infoDiv'>{book.title}</div>
                <div className='infoDiv'>{book.author}</div>
                <div className='infoDiv'>{book.state}</div>
                <div className='infoDiv'>{book.rating || 'N/A'}</div>
            </div>
        </a>
    );
}
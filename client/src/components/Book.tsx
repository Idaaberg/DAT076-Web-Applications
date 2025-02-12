import { Book } from '../api';
import defaultImage from '../img/default.jpg';


export function BookComponent({ book }: { book : Book}) {
    return (
        <li className="bookCard">
        <div className="book-image">
            <img
                src={defaultImage}
                alt={`Cover of ${book.title}`}
                width="100px"
                height="150px"
            />
        </div>
        <div className="book-info">
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.state}</div>
            <div>{book.rating || 'N/A'}</div>
        </div>
        </li>
    );
    }